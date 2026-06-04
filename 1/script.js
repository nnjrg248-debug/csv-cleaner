        const dropZone = document.getElementById('dropZone');
        const csvFile = document.getElementById('csvFile');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const cancelClear = document.getElementById('cancelClear');
        const copyBtn = document.getElementById('copyBtn');
        const tableContainer = document.getElementById('tableContainer');

        // コピー対象となる「クリーニング済みのテキスト」を一時保存する変数
        let cleanedTextForCopy = "";

        // クリック時はファイル選択を開く（ただし、テキスト選択等の邪魔にならないよう配慮）
        dropZone.addEventListener('click', (e) => {
            if (e.target === dropZone) {//クリックしたものがテキストの時 e.target === テキスト となりe.target === dropZoneは成り立たないということ
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
            } else {
                alert('CSVファイルを選択してください。');
            }
        });

        csvFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
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
                showFileInfo("貼り付けられたテキスト");
                displayCSV(pastedText);
            }
        });

        function showFileInfo(name) {
            fileName.textContent = `選択データ: ${name}`;
            fileInfo.style.display = 'flex'; 
            copyBtn.textContent = 'CSVをコピー'; // ボタン表示を初期化
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
                    copyBtn.textContent = 'CSVをコピー';
                }, 2000); // 2秒後に元の文字に戻す
            }).catch(err => {
                alert('コピーに失敗しました: ' + err);
            });
        });

        function processFile(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const text = event.target.result;
                displayCSV(text);
            };
            reader.readAsText(file, 'UTF-8');
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
                    let cleanCell = cell.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '').replace(/^"|"$/g, '');//let cleanCell = cell.trim().replace(/^"|"$/g, '');                    
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
