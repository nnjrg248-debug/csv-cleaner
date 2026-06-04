        const dropZone = document.getElementById('dropZone');
        const csvFile = document.getElementById('csvFile');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const cancelClear = document.getElementById('cancelClear');
        const copyBtn = document.getElementById('copyBtn');
        const tableContainer = document.getElementById('tableContainer');
        const exportExcelBtn = document.getElementById('exportExcelBtn');
        const exportCsvBtn = document.getElementById('exportCsvBtn');

        // 【追加】直接入力用のテキストエリア（HTMLのIDに合わせてください）
        const csvTextArea = document.getElementById('csvTextArea');

        // コピー対象となる「クリーニング済みのテキスト」を一時保存する変数
        let cleanedTextForCopy = "";

        // 【追加】貼り付けられた生テキストを記憶しておく変数
        let currentRawText = ""; 

        const encodingRadios = document.querySelectorAll('input[name="encoding_mode"]');
        const bomCheckbox = document.getElementById('utf8_with_bom');

        // HTMLのクラス名「.bom-option」に完全に合わせる
        const bomOptionGroup = document.querySelector('.bom-option');

        let FileCode ="";

        // 「BOMあり」チェックボックスのデフォルトをチェック付きにする
        if (bomCheckbox) {
            bomCheckbox.checked = true;
        }

        // 「UTF-8」のときだけチェックボックスを有効化（それ以外は無効化）する関数
        function updateBomStatus() {
            if (!bomCheckbox) return;
            const isUtf8Selected = document.getElementById('mode_utf8').checked;
            bomCheckbox.disabled = !isUtf8Selected;

            // HTMLの .bom-option 要素に対してクラスを付け外しする
            if (bomOptionGroup) {
                if (isUtf8Selected) {
                    bomOptionGroup.classList.remove('is-disabled');
                } else {
                    bomOptionGroup.classList.add('is-disabled');
                }
            }
        }
        
        // ラジオボタンの状態から「対応する文字コード(utf8,SJIS)」を決定する関数
        async function getSelectedEncoding(file) {
            let encoding = 'UTF-8'; // デフォルト値

            if (document.getElementById('mode_sjis').checked) {
                // Shift-JISが選ばれている場合
                encoding = 'Shift_JIS';
            } else if (document.getElementById('mode_utf8').checked) {
                // UTF-8が選ばれている場合
                encoding = 'UTF-8';
            } else if (document.getElementById('mode_auto').checked) {
                // 自動判定が選ばれている場合（※別機械・処理を挟む場合はここを変更）
                encoding = await AutoJudge(file);
            }

            return encoding;
        }

        // ファイルを読み込んで文字コードを自動判定する非同期関数
        async function AutoJudge(file) {
            if (!file) return 'UTF-8'; // ファイルがない場合はデフォルト値を返す

            try {
                // ファイルをバイナリ（バイト列）として読み込む
                const bytes = await readAsArrayBuffer(file);
                
                // 1. UTF-8 の BOMチェック (0xEF, 0xBB, 0xBF)
                if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
                    return 'UTF-8';
                }
                
                // 2. Shift-JIS 特有のバイト範囲チェック
                for (let i = 0; i < bytes.length - 1; i++) {
                    const b = bytes[i];
                    if ((b >= 0x81 && b <= 0x9F) || (b >= 0xE0 && b <= 0xFC)) {
                        return 'Shift_JIS'; // Shift-JIS特有の文字コードがあれば判定
                    }
                }
            } catch (err) {
                console.error('自動判定中にエラーが発生しました:', err);
            }
            
            return 'UTF-8'; // どちらにも該当しない、またはエラー時はデフォルト値
        }

        // 【補助関数】ファイルをバイナリ（Uint8Array）として読み込むためのPromiseラッパー
        function readAsArrayBuffer(file) {
            return new Promise((resolve, reject) => {
                const r = new FileReader();
                r.onload = e => resolve(new Uint8Array(e.target.result));
                r.onerror = e => reject(e);
                r.readAsArrayBuffer(file);
            });
        }

        /*
        function getSelectedEncoding() {
            let encoding = 'UTF-8'; // デフォルト値

            if (document.getElementById('mode_sjis').checked) {
                // Shift-JISが選ばれている場合
                encoding = 'Shift_JIS';
            } else if (document.getElementById('mode_utf8').checked) {
                // UTF-8が選ばれている場合
                encoding = 'UTF-8';
            } else if (document.getElementById('mode_auto').checked) {
                // 自動判定が選ばれている場合（※別機械・処理を挟む場合はここを変更）
                encoding = 'UTF-8'; 
            }

            return encoding;
        }
        */




        // ラジオボタンが変更されたら状態を更新するイベントを設定
        encodingRadios.forEach(radio => {
            radio.addEventListener('change', updateBomStatus);
        });

        // 初期状態（自動判定が選択されている状態）を反映
        updateBomStatus();


        // クリック時はファイル選択を開く（ただし、テキスト選択等の邪魔にならないよう配慮）
        dropZone.addEventListener('click', (e) => {
            if (dropZone.contains(e.target)) {//if (e.target === dropZone) {//クリックしたものがテキストの時 e.target === テキスト となりe.target === dropZoneは成り立たないということ
                csvFile.click();
            }
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].name.endsWith('.csv')) {
                showFileInfo(files[0].name);
                processFile(files[0]);

                // 2. 正しいファイルだった場合のみ、直接入力モードに切り替える
                const modeDirectInput = document.getElementById('modeDirect');
                if (modeDirectInput) {
                    modeDirectInput.checked = true;
                    toggleMode(); // 画面表示を切り替える
                }

            } else {
                alert('CSVファイルを選択してください。');
            }
        });

        csvFile.addEventListener('change', (e) => {//←ファイル入力欄で新しくファイルが選択されたときのイベントハンドラー
            const file = e.target.files[0];        //↑csvFileはファイルダイアログを開くオブジェクトとなっている
            if (file) {
                // 【追加】ラジオボタンを「直接テキスト入力」への切り替えるスライド処理
                const modeDirectInput = document.getElementById('modeDirect');
                if (modeDirectInput) {
                    modeDirectInput.checked = true;
                    // 画面の表示（表示非表示やボタンの制御）を更新する
                    modeDirectInput.dispatchEvent(new Event('change'));
                }

                showFileInfo(file.name);
                processFile(file);
            }
        });

        // 【追加】貼り付け（Ctrl + V）イベントの処理  貼り付け処理はここだけ
        dropZone.addEventListener('paste', (e) => {
            e.preventDefault();
            // クリップボードからテキストデータを取得
            const pastedText = e.clipboardData.getData('text');
            if (pastedText.trim() !== "") {
                // 1. グローバル変数（またはスコープ内の変数）にテキストを保存
                currentRawText = pastedText;
                // 2. ラジオボタンを「直接テキスト入力」に切り替える
                const modeDirectInput = document.getElementById('modeDirect');
                if (modeDirectInput) {
                    modeDirectInput.checked = true;
                    
            // 3. 画面の表示（表示非表示やボタンの制御）を更新する
            // 引数に模擬イベントを渡すか、null条件に対応させます
            //toggleMode({ target: modeDirectInput });
                    modeDirectInput.dispatchEvent(new Event('change'));
                }
                showFileInfo("貼り付けられたテキスト");
                displayCSV(pastedText);//文字の表示処理だがが文字コード変換は必要なし（文字コード変換はﾌｧｲﾙからの読出しで使うもの）
            }
        });

        function showFileInfo(name) {
            fileName.textContent = `選択データ: ${name}`;
            fileInfo.style.display = 'flex'; 
            // ボタンの表示を初期化
            copyBtn.textContent = '表データをコピー';
            exportExcelBtn.textContent = 'Excelで保存';
            exportCsvBtn.textContent = 'CSVファイルで保存';
        }

        // キャンセルがクリックされた時の消去処理
        cancelClear.addEventListener('click', () => {
            tableContainer.innerHTML = ''; 
            fileInfo.style.display = 'none'; 
            csvFile.value = ''; 
            cleanedTextForCopy = ''; // 保存データもリセット
        });

        // 【追加】コピーボタンのクリック処理
        copyBtn.addEventListener('click', () => {
            if (!cleanedTextForCopy) return;
            
            // クリップボードにテキストを書き込み
            navigator.clipboard.writeText(cleanedTextForCopy).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = '表データをコピー';
                }, 2000); // 2秒後に元の文字に戻す
            }).catch(err => {
                alert('コピーに失敗しました: ' + err);
            });
        });

        // 2. Excel保存ボタン
        exportExcelBtn.addEventListener('click', () => {
            if (!cleanedTextForCopy || cleanedTextForCopy.trim() === '') return;

            try {
                const rows = cleanedTextForCopy.split('\n').map(row => row.split(','));
                const worksheet = XLSX.utils.aoa_to_sheet(rows);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, "exported_data.xlsx");
            } catch (err) {
                alert('Excel保存に失敗しました: ' + err);
            }
        });

        // 3. CSVファイル保存ボタン
        exportCsvBtn.addEventListener('click', () => {
            if (!cleanedTextForCopy || cleanedTextForCopy.trim() === '') return;

            try {
                // 1. ラジオボタンとBOMの選択状態を取得
                const isBom = document.getElementById('utf8_with_bom').checked;
                const currentEncoding = getSelectedEncoding(FileCode); // 【修正】関数から現在の文字コードを取得
                //ファイル読み込み時とCSV保存,文字コードを同じにすること問題なしとのこと
                let blob;
                let filename = "";

                // 2. 選択された文字コードに応じてBlobを作成
                if (currentEncoding === 'Shift_JIS') { // 【修正】文法エラーを直しました
                    // 【Shift-JIS変換処理】
                    const str = cleanedTextForCopy;
                    const numList = [];
                    for (let i = 0; i < str.length; i++) {
                        const code = str.charCodeAt(i);
                        if (code < 0x80) {
                            numList.push(code);
                        } else {
                            const encoded = new TextEncoder().encode(str[i]);
                            numList.push(...encoded); 
                        }
                    }
                    const uint8Array = new Uint8Array(numList);
                    blob = new Blob([uint8Array], { type: 'text/csv;charset=Shift_JIS;' });
                    filename = "exported_data_sjis.csv";

                } else {
                    // 【UTF-8処理】（自動判定のときもデフォルトはこれ）
                    // 【修正】コメントアウトしていた isUtf8 の代わりに、HTML要素の状態を直接見て判定します
                    const isUtf8Selected = document.getElementById('mode_utf8').checked;

                    if (isUtf8Selected && isBom) {
                        // UTF-8 かつ BOMありのときだけ「\uFEFF」を先頭に付ける
                        blob = new Blob(['\uFEFF' + cleanedTextForCopy], { type: 'text/csv;charset=utf-8;' });
                        filename = "exported_data_utf8_bom.csv";
                    } else {
                        // UTF-8 かつ BOMなし（または自動判定）のときは「\uFEFF」を付けずに保存
                        blob = new Blob([cleanedTextForCopy], { type: 'text/csv;charset=utf-8;' });
                        filename = "exported_data_utf8.csv";
                    }
                }

                // 3. ダウンロード処理を実行
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                
                a.href = url;
                a.download = filename; 
                document.body.appendChild(a);
                a.click();
                
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (err) {
                alert('CSV保存に失敗しました: ' + err);
            }
        });


        function processFile(file) {//ファイル選択時、ファイル貼付け時呼び出される（テキスト貼付け時は呼び出されない）
            const reader = new FileReader();
            reader.onload = function(event) {
                const text = event.target.result;
                currentRawText = text; // 【追加】ファイル読み込み時も生テキストを記憶する
                if (csvTextArea) {//csvTextArea（テキストエリア）が画面上に存在していれば
                    csvTextArea.value = text;
                }

                displayCSV(text);//←reader.readAsTextの後実行、reader.onload = function(event) は予約（イベントリスナー）なので
            };
            reader.readAsText(file, getSelectedEncoding(file));//reader.readAsText(file, 'UTF-8');
            FileCode=file;
        }

        // CSVのテキストを分解してテーブルにする関数
        function displayCSV(text) {
            const lines = text.split(/\r?\n/); // /\r?\n/について([/]:正規表現を囲むマーク、[?]:「直前の文字が0回、または1回だけ存在する(\rがあってもなくてもいい)という意味」)\r：きゃりっじリターン、\nラインフィード
            let html = '<table>';            
            let cleanedLines = []; // コピー用の行配列
            let seenLines = new Set(); // 重複チェック用のセットを追加

            lines.forEach((line, index) => {//forEach((line:ループで今処理している要素のデータ,index:その順番（インデックス番号）)
                if (line.trim() === '') return; //forEach内のreturnはVBのContinue For （forを抜けるExit Forでなく）' これ以降の処理をスキップして、次のline（行）に進む
                let html2 = '';
                // カンマ、タブ、セミコロンのどれでも区切れるように調整
                const cells = line.split(/,|\t|;/); 
                html += '<tr>';
                let cleanedCells = []; // コピー用の空のセル配列
                
                cells.forEach(cell => {//cells配列を1つずつループ処理,取出した1つ分のデータを cell という変数名で扱う
                    // 前後の空白とダブルクォーテーションを自動で削除
                    let cleanCell = cell.trim().replace(/^"|"$/g, '');
                    //let cleanCell = cell.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '').replace(/^"|"$/g, '');//let cleanCell = cell.trim().replace(/^"|"$/g, '');                    
                    //g は 「マッチするものをすべて対象にする」(最初の1つだけでない)グローバル検索フラグ、[\s\u3000]は全角スペース(\u3000)半角スペース(\s)を合わせたもの
                    //+$ とは（末尾に1文字以上連続する
                    //+ ： 「直前の文字が1文字以上連続、$ ： 「文字列の末尾」（* ： 「直前の文字が0文字以上連続、. ： 「任意の文字(空文字含まず)」、.*：任意の文字が0回以上(任意の文字なのでどんな文字列でもよいとなる)
                    cleanedCells.push(cleanCell);//配列cleanedCellsの後ろに配列としてcleanCellを追加
                    
                    if (index === 0) {
                        html2 += `<th>${cleanCell}</th>`;//${変数} を使って文字列の中に変数を埋め込む機能（テンプレートリテラル）としてﾊﾞｯｸｸｫｰﾂ（`）で囲む
                    } else {
                        html2 += `<td>${cleanCell}</td>`;
                    }
                });
                 // もし行全体のセルがすべて空っぽ（または無視された）ならスキップ
                if (cleanedCells.length === 0) return;
                // --- 重複検証行joinedLine ---
                const joinedLine = cleanedCells.join(',');
                // 1行目（ヘッダー）以外で、すでに同じ行が存在する場合はスキップ（重複削除）
                if (index > 0 && seenLines.has(joinedLine)) return;

                // 重複なし行を記録
                seenLines.add(joinedLine);
                html += html2 + '</tr>';                
                // クリーニングしたセルをカンマで再結合して（配列として）行に追加
                cleanedLines.push(joinedLine);
            });
            
            
            html += '</table>';
            tableContainer.innerHTML = html;

            // クリーニング済みの全行を改行で結合して変数に格納
            cleanedTextForCopy = cleanedLines.join('\n');
        }


        document.addEventListener('DOMContentLoaded', () => {//スライドしたのイベントで、どちらの項目になったかを監視してその際の処理を記載
           // モード切り替え要素の取得
            const modeFileInput = document.getElementById('modeFile');
            const modeDirectInput = document.getElementById('modeDirect');
            const dropZone = document.getElementById('dropZone');
            const directInputZone = document.getElementById('directInputZone');
            const convertBtn = document.getElementById('convertBtn');

            // --- 【追加・修正】貼り付け（paste）イベントのスライド処理 ---
            if (dropZone) {
                dropZone.addEventListener('paste', (e) => {
                    e.preventDefault();
                    // クリップボードからテキストを取得
                    const pastedText = e.clipboardData.getData('text');
                    
                    if (pastedText.trim() !== "") {
                        // 変数への保存（グローバル変数 currentRawText がある前提）
                        if (typeof currentRawText !== 'undefined') {
                            currentRawText = pastedText;
                        }

                        // 「直接テキスト入力」のラジオボタンを取得してチェックを入れる
                        if (modeDirectInput) {
                            modeDirectInput.checked = true;
                            
                            // ブラウザに「切り替わった」イベントを人工的に発生させる
                            // これにより、元の function toggleMode() が引数なしのままであっても確実に連動します
                            modeDirectInput.dispatchEvent(new Event('change'));
                        }

                        // データの解析と表示を実行（既存の関数）
                        if (typeof showFileInfo === 'function') showFileInfo("貼り付けられたテキスト");
                        if (typeof displayCSV === 'function') displayCSV(pastedText);
                    }
                });
                
                
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault(); // ドロップできるようにデフォルト挙動を制限
                });

                dropZone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    
                    // ドロップされたファイルを取得
                    const files = e.dataTransfer.files;
                    if (files.length === 0) return;

                    const file = files[0];
                    const reader = new FileReader();

                    // ファイルの読み込みが完了したときの処理
                    reader.onload = function(event) {//ファイル読込後に呼び出すイベントリスナー（＝予約）
                        const fileText = event.target.result;

                        // 1. 変数にテキストを保存
                        if (typeof currentRawText !== 'undefined') {
                            currentRawText = fileText;
                        }

                        // 2. ラジオボタンを「直接テキスト入力」に切り替えてイベントを発生させる
                        if (modeDirectInput) {
                            modeDirectInput.checked = true;
                            modeDirectInput.dispatchEvent(new Event('change')); // これでtoggleModeが走りテキストエリアに文字が入る
                        }

                        // 3. データの解析と表示を実行
                        if (typeof showFileInfo === 'function') showFileInfo(file.name);
                        if (typeof displayCSV === 'function') displayCSV(fileText);
                    };

                    // テキストファイルとして読み込み開始
                    reader.readAsText(file, getSelectedEncoding(file));//reader.readAsText(file, 'UTF-8'); //ファイル読込前に文字コード変換を行う
                    FileCode=file;
                });               

            }

            if (modeFileInput && modeDirectInput) {//切り替えスイッチのHTML要素が存在しているか？」を確認 存在しない場合エラーになる
            //切り替えスイッチのHTML要素が2つとも無事に見つかったときだけ、次の処理（イベント登録）に進む    
                // changeイベントを確実に登録
                modeFileInput.addEventListener('change', toggleMode);//状態が『変化（change）』したら、toggleMode 
                modeDirectInput.addEventListener('change', toggleMode);//という関数実施という命令（＝イベントじの処理の予約）
            }

            function toggleMode() {
                 // 1. イベントが発生した要素（どちらのラジオボタンが押されたか）を特定する
                // 引数 e があればそれを使い、なければブラウザの global event を参照する
                const target = event ? event.target : null;

                if (modeDirectInput.checked) {
                    // 直接入力モード
                    if(dropZone) dropZone.style.display = 'none';
                    if(directInputZone) directInputZone.style.display = 'block';
                    if(convertBtn) convertBtn.style.display = 'inline-block'; // ボタンを出す

                    // 【追加】記憶していたテキストを、テキストエリアに表示させる
                    if (csvTextArea) {
                        csvTextArea.value = currentRawText;
                    }
                } else {
                    // ファイル選択モード
                    // 【ここを修正】イベントの発生元が「ファイル選択（modeFileInput）」に切り替わった瞬間だけ保存する
                    // これにより、超高速でイベントが連打されても、確実に切り替え前の値を1回だけ退避できます
                    if (target && target.id === 'modeFile') {
                        if (csvTextArea) {
                            currentRawText = csvTextArea.value;
                        }
                    }

                    if(dropZone) dropZone.style.display = 'block';
                    if(directInputZone) directInputZone.style.display = 'none';
                    if(convertBtn) convertBtn.style.display = 'none'; // ボタンを隠す
                }
            }

                // 【追加】直接入力モード中に「変換ボタン」を押しても動作するように設定
            if (convertBtn) {
                convertBtn.addEventListener('click', () => {
                    if (csvTextArea) {
                        const inputText = csvTextArea.value;
                        if (inputText.trim() === '') {
                            alert('テキストを入力または貼り付けてください。');
                            return;
                        }
                        currentRawText = inputText; // 直接書き換えた場合のために更新
                        showFileInfo("直接入力されたテキスト");
                        displayCSV(inputText);//文字の表示処理だがが文字コード変換は必要なし（文字コード変換はﾌｧｲﾙからの読出しで使うもの）
                    }
                });
            }
            toggleMode(); 
        });
