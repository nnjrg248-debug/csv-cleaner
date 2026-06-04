        const dropZone = document.getElementById('dropZone');
        const csvFile = document.getElementById('csvFile');
        const fileInfo = document.getElementById('fileInfo');
        const ConceptInfo_top = document.getElementById('ConceptInfo-top');
        const fileName = document.getElementById('fileName');
        const cancelClear = document.getElementById('cancelClear');
        const copyBtn = document.getElementById('copyBtn');
        const tableContainer = document.getElementById('tableContainer');
        const exportExcelBtn = document.getElementById('exportExcelBtn');
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        const modeFileInput = document.getElementById('modeFile');
        const modeDirectInput = document.getElementById('modeDirect');
            //const dropZone = document.getElementById('dropZone');
        const directInputZone = document.getElementById('directInputZone');
        const convertBtn = document.getElementById('convertBtn');
        const clearBtn = document.getElementById('clearBtn');
        const chkColumnCnt = document.getElementById('chkColumnCnt');
        const chkdelcnm = document.getElementById('chkdelcnm');
        // 【追加】直接入力用のテキストエリア（HTMLのIDに合わせてください）
        const csvTextArea = document.getElementById('csvTextArea');
        const body = document.body;
        
        const encodingBlock = document.querySelector('encodingblock');
        const separatorBlock = document.querySelector('separatorblock');

        //const encodingInputs = document.querySelectorAll('.setting-block input[name="encoding_mode"], .setting-block input[name="utf8_bom"]');//文字コード欄内のrんこーどのらひおボックスとbomのチェックボックス


        // コピー対象となる「クリーニング済みのテキスト」を一時保存する変数
        let cleanedTextForCopy = "";
        let GlobalmaxColumns=0;//let GlobalmaxColumns = "";でもよいが　0代入が自然
        // 【追加】貼り付けられた生テキストを記憶しておく変数
        let currentRawText = ""; 
        let currentFileInputMode = 'file'; // 現在のモードを記憶する変数
        let chkMojicode = document.getElementById('chkMojicode');
        const encodingRadios = document.querySelectorAll('input[name="encoding_mode"]');
        const bomCheckbox = document.getElementById('utf8_with_bom');
        // HTMLのクラス名「.bom-option」に完全に合わせる
        const bomOptionGroup = document.querySelector('.bom-option');


        //const pageValue = document.querySelector('meta[name="page"]').getAttribute('content');
        const pageValue = document.querySelector('meta[name="page"]')?.content;

        const setAll = document.getElementById('setAll');
        const set = document.getElementById('set');

        



        switch (pageValue) {// 2. switch文の中は「画面の表示・非表示の切り替え」以外の処理は書かない
            case '1':
            case '6':
                if(setAll)setAll.style.display ='block';
                if(set)set.style.display = 'none';
                if(chkMojicode)chkMojicode=null;
                break;
            default:
                if(setAll)setAll.style.display ='none';
                if(set)set.style.display = 'block';
                separatorBlock.style.backgroundColor= '#AAAAAA';
                break;
        }

        
        switch (pageValue) {
            case '1':
                //bomCheckbox.disabled=false;
                break;
            default:
                const separateInputs = document.querySelectorAll('.setting-block input[name="separate"]');                    
                separateInputs.forEach(target => {                                
                        target.disabled = true;
                        target.checked  = false;
                    });
                const topTitle = document.querySelector('.top-title');
                topTitle.innerHTML="@CSVクレンジングツール"
                const mainTitle = document.querySelector('.main-title');
                mainTitle.innerHTML="ブラウザだけで使える@CSVクレンジングツール"
                const descrip = document.querySelector('.sub-title .description P');
                descrip.innerHTML="CSVスッキリは、CSVの@クレンジング・整形ができる無料オンラインツールです。<br>" 
                                +"文字化け、区切りズレ、不要な改行や重複行の修正などを一瞬で解決。<br>"
                                +"ファイルはサーバー送信なしの安心設計です。";
                const descripcont = document.querySelector('.sub-title .description-container');
                             
                switch (pageValue) {
                case '2':                    
                    document.getElementById('chkTab').checked  = true;  
                    topTitle.innerHTML = topTitle.innerHTML.replace('@', '[TSV→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[TSV→CSV]変換専用');
                    descrip.innerHTML = descrip.innerHTML.replace('@', '[TSV→CSV]変換専用');    
                    descripcont.style.width="60%"                
                    break;
                case '3':
                    document.getElementById('chkSemicolon').checked  = true;  
                    topTitle.innerHTML = topTitle.innerHTML.replace('@', '[セミコロン→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[セミコロン→CSV]変換専用');
                    descrip.innerHTML = descrip.innerHTML.replace('@', '[セミコロン→CSV]変換専用');
                    descripcont.style.width="62%"        
                    break;
                case '4':
                    document.getElementById('chkSpace').checked  = true; 
                    topTitle.innerHTML = topTitle.innerHTML.replace('@', '[半角スペース→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[半角スペース→CSV]変換専用');
                    descrip.innerHTML = descrip.innerHTML.replace('@', '[半角スペース→CSV]変換専用');
                    descripcont.style.width="62%"
                    break;
                case '5':
                    document.getElementById('chkComma').checked  = true; 
                    topTitle.innerHTML = topTitle.innerHTML.replace('@', 'CSVクレンジング専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', 'CSVクレンジング専用');
                    descrip.innerHTML = descrip.innerHTML.replace('@', 'CSVクレンジング専用');
                    descripcont.style.width="62%"
                    break;
                case '6':
                    document.getElementById('chkComma').checked  = true; 
                    topTitle.innerHTML = topTitle.innerHTML.replace('@', 'CSV文字化け修正専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', 'CSV文字化け修正専用');
                    descrip.innerHTML = descrip.innerHTML.replace('@', 'CSV文字化け修正専用');
                    descripcont.style.width="62%"
                    separatorBlock.style.backgroundColor= '#AAAAAA';
                    //bomCheckbox.disabled=false;
                    break;

        }
    }
   
    if(chkMojicode){
        chkMojicode.addEventListener('change', () => {
            const encodingInputs = document.querySelectorAll(
                '.setting-block input[name="encoding_mode"]:not(#chkMojicode), ' +
                '.setting-block input[name="utf8_bom"]:not(#chkMojicode)'
            );                    
            encodingInputs.forEach(target => {                                
                    target.disabled = !chkMojicode.checked;
            });
            // --- 背景色の切り替え処理 ---
            if (encodingBlock) { 
                if (chkMojicode.checked) {
                    // チェックがついている（true）のとき
                    encodingBlock.style.backgroundColor =  '#FFFFFF';
                } else {
                    // チェックが外れている（false）のとき
                    encodingBlock.style.backgroundColor ='#AAAAAA';  
                }
            } 

        });
        // 初期状態でチェックをクリックするイベントをさせ初期値を設定する
        chkMojicode.dispatchEvent(new Event('change'));            
    }

     



        toggleMode(null); //初期設定
        
        updateBomStatus();// 初期状態（自動判定が選択されている状態）を反映

        window.onbeforeunload = () => {//f5押したときスクロールトップ
            //window.scrollTo(0, 0);
        };

        //let FileCode ="";
        let lastDetectedEncoding = 'UTF-8'
        // 「BOMあり」チェックボックスのデフォルトをチェック付きにする


        
        if (bomCheckbox) {
            bomCheckbox.checked = true;
        }




        function switchToFileMode() {
            currentFileInputMode = 'file';
            toggleMode();
        }

        function switchToDirectMode() {
            currentFileInputMode = 'input';
            toggleMode();
        }

        // 「UTF-8」のときだけチェックボックスを有効化（それ以外は無効化）する関数
        function updateBomStatus() {
            if (!bomCheckbox) return;

            // 1. 親玉の「【文字コード】」にチェックが入っているか確認する
            const chkMojicode = document.getElementById('chkMojicode');
            const isMojicodeChecked = chkMojicode ? chkMojicode.checked : false;

            // 2. ラジオボタン「UTF-8」にチェックが入っているか確認する
            const isUtf8Selected = document.getElementById('mode_utf8').checked;

            // ★両方ともON（true）のときだけ、BOMチェックボックスを有効化（disabled = false）する
            bomCheckbox.disabled = !(isMojicodeChecked && isUtf8Selected);
        }      
        
        
        function showFileInfo(name) {//キャンセル、コピー、CSV・excel保存ボタン表示切替
            fileName.textContent = `選択データ: ${name}`;
            fileInfo.style.display = 'flex'; 
            ConceptInfo_top.style.display = 'none';
            body.style.overflowX = 'visible'; 
            // ボタンの表示を初期化
            copyBtn.textContent = '表データをコピー';
            exportExcelBtn.textContent = 'Excelで保存';
            exportCsvBtn.textContent = 'CSVファイルで保存';
            // ★先にcheckedを切り替えてからtoggleModeを呼ぶ
           // modeFileInput.checked = true;
           // toggleMode({ target: modeFileInput });
        }

        

        
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
                encoding = 'AUTO'; 
            }

            return encoding;
        }
        
        // ファイルを自動判定して読み込み、完了したら callback を実行する共通関数
        //引数callbackはこの関数の内のcallback(text, detectedEncoding)のこと 呼出側loadFileWithAutoEncoding(file, (text, encoding) のtext, encodingに当る
        //定義側のcallback(text, detectedEncoding)を実行した後、呼出側内にtext,encodingが渡され呼出し側用意された アロー関数（=> 以降に定義された関数）が実行される
        function loadFileWithAutoEncoding(file, callback) {
            if (!file) return;

            const mode = getSelectedEncoding();
            const reader = new FileReader();

            if (mode === 'AUTO') {
                // --- 【自動判定モード】 ---
                reader.readAsArrayBuffer(file);
                reader.onload = (readerEvent) => {
                const bytes = new Uint8Array(readerEvent.target.result);
                    
                    
                    
// ↓↓↓↓↓　UTF-8 , Shift-JIS以外は対象外としてるのでこのブロックは削除しての構わないがとっておく
                const utf16 = detectUTF16(bytes);
                if (utf16) {
                    // UTF-16 と判定された場合は TextDecoder で正しく読む
                    const text = new TextDecoder(utf16).decode(bytes);
                    alert("このファイルは UTF-8 でも Shift-JIS でも でもありません。UTF-16です。")
                    callback(text, utf16);
                    return;
                }
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

                // バイト列から文字コードを判定（前回の判定関数を呼び出す）
                const detectedEncoding = judgeEncodingFromBytes(bytes);

                try {
                        const textDecoder = new TextDecoder(detectedEncoding);
                        const text = textDecoder.decode(bytes);
                        callback(text, detectedEncoding);
                    } catch (e) {
                        // 3. どれでも読めなかった → 対応外
                        alert("このファイルは UTF-8 でも Shift-JIS  でもありません。対応外です。");
                        callback("", "UNKNOWN");
                    }
                };
            } else {
                // --- 【手動選択モード（UTF-8 / Shift_JIS）】 ---
                reader.readAsText(file, mode);
                reader.onload = (readerEvent) => {
                    const text = readerEvent.target.result;
                    
                    // 文字化けチェック（UTF-8ファイルをSJISで読むと � が混入する）
                    //if (text.includes('\uFFFD')) {
                    //    alert(`文字化けが検出されました。エンコードを変えて再試行してください。\n現在の設定: ${mode}`);
                    //    return;
                    //}

                    // 読み込み完了後の処理を実行
                    callback(text, mode);
                };
            }
        }

        
        // （参考）前回の判定関数も合わせてここに配置しておきます
        function judgeEncodingFromBytes(bytes) {
            // BOMあり UTF-8
            if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) return 'UTF-8';

            // UTF-8として正しく読めるか試す
            try {
                const decoder = new TextDecoder('UTF-8', { fatal: true }); // fatal:trueで不正バイトは例外
                decoder.decode(bytes);
                return 'UTF-8'; // 例外が出なければUTF-8
            } catch (e) {}
            try {
                new TextDecoder('Shift_JIS', { fatal: true }).decode(bytes);
                return 'Shift_JIS';
            } catch (e) {}

            // ここまで来たらどちらでも読めなかった
            alert('このファイルはUTF-8、Shift_JIS以外の文字コードのため読み込めません。');
            return 'UTF-8';
        }

        function detectUTF16(buffer) {
        const bytes = new Uint8Array(buffer);

        // 1. BOM チェック
        if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
            return "UTF-16LE";
        }
        if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
            return "UTF-16BE";
        }

        // 2. BOM がない場合でも、ヌル文字の頻度で判定
        let nullCount = 0;
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] === 0x00) nullCount++;
        }

        // 全体の 20% 以上が 0x00 → UTF-16 の可能性が高い
        if (nullCount / bytes.length > 0.2) {
            return "UTF-16 (no BOM)";
        }

        return null; // UTF-16 ではない
        }


        // CSVデータを現在の選択モードに合わせて自動保存する共通関数
        function saveCSVWithEncoding(filename, text) {
            // 1. 読み込み時と同じ関数を使い、文字コードの文字（'UTF-8' や 'Shift_JIS' など）を同期的に取得
            // ※今回はファイルを渡さない（中身を直接見るわけではない）ので、fileの代わりにnullを渡します
            let currentEncoding = getSelectedEncoding(); 
            
            // 自動判定（AUTO）が選ばれていた場合は、デフォルトとして UTF-8 にする
            if (currentEncoding === 'AUTO' || currentEncoding === '') {
                currentEncoding = lastDetectedEncoding; 
            }

            const isBom = document.getElementById('utf8_with_bom').checked;
            let blob;
            let finalFilename = "";//let finalFilename = filename;

            // 2. 文字コードに応じた Blob の作成
            if (currentEncoding === 'Shift_JIS') {
                // 🔥 Shift-JIS 変換
                const sjisArray = Encoding.convert(
                    Encoding.stringToCode(text),
                    'SJIS',
                    'UNICODE'
                );

                blob = new Blob([new Uint8Array(sjisArray)], {
                    type: 'text/csv;charset=Shift_JIS;'
                });                
                finalFilename = "exported_data_sjis.csv";

            } else {
                // 【UTF-8処理】
                if (isBom) {
                    // BOMあり
                    blob = new Blob(['\uFEFF' + text], { type: 'text/csv;charset=utf-8;' });
                    finalFilename = "exported_data_utf8_bom.csv";
                } else {
                    // BOMなし
                    blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
                    finalFilename = "exported_data_utf8.csv";
                }
            }

            // 3. ダウンロード処理を実行
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = finalFilename; 
            document.body.appendChild(a);
            a.click();
            
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        
       


        // ラジオボタンが変更されたら状態を更新するイベントを設定
        encodingRadios.forEach(radio => {
            radio.addEventListener('change', updateBomStatus);
        });

        

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
            /* dropZone.addEventListener('drop', (e) => {　の中にdropZone.classList.remove('dragover');　がある理由
            dropZoneにファイルをドラッグしドラッグオーバーすると
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropZone.classList.add('dragover'); // ドラッグ中に色が変わるなどのスタイルを当てる
                });
            のようにスタイル変わり、 dropZone の上に乗っている間ずっと dragover クラスが付いたままになる
            ファイルを離してドロップした瞬間、dragover イベントは終わり drop イベントに切り替わるが
            この時点で「ドラッグ中のスタイル」はもう不要なので「 dropZone.classList.remove('dragover');」とするのである

            dropZone.addEventListener('dragover', (e) => {
            */
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].name.toLowerCase().endsWith('.csv')) {//大文字小文字関係なく.CSVで終わるﾌｧｲﾙ
                showFileInfo(files[0].name);
                processFile(files[0]);

                // 2. 正しいファイルだった場合のみ、直接入力モードに切り替える
                //const modeDirectInput = document.getElementById('modeDirect');
                if (modeDirectInput) {
                    currentFileInputMode='input';//modeDirectInput.checked = true;
                    toggleMode();//toggleMode(null); // 画面表示を切り替える
                }

            } else {
                alert('CSVファイルを選択してください。');
            }
        });

        //csvFile.addEventListener('change', (e) => {//←ファイル入力欄で新しくファイルが選択されたときのイベントハンドラー
        csvFile.addEventListener('change', (e) => {//←ファイル入力欄で新しくファイルが選択されたときのイベントハンドラー
            const file = e.target.files[0];        //↑csvFileはファイルダイアログを開くオブジェクトとなっている
            if (file) {
                // 【追加】ラジオボタンを「直接テキスト入力」への切り替えるスライド処理
                //const modeDirectInput = document.getElementById('modeDirect');
                if (modeDirectInput) {
                    currentFileInputMode='input'//modeDirectInput.checked = true;
                    // 画面の表示（表示非表示やボタンの制御）を更新する
                    toggleMode();//toggleMode(null);
                    //modeDirectInput.addEventListener('change', toggleMode);という（changeしたらtoggleMode）というイベントの処理登録してるので
                    //modeDirectInput.dispatchEvent(new Event('change'));はtoggleMode(); と同じ意味
                    //そして現在toggleModeに置き換えてしまったので、もはやmodeDirectInput.addEventListener('change', toggleMode);というコードもいらなくなるが　とりあえず残しとく　いらなくなったら消す予定
                }

                showFileInfo(file.name);
                processFile(file);

                e.target.value = ''; 
            }
        });

        // 【追加】貼り付け（Ctrl + V）イベントの処理  貼り付け処理はここだけ
        dropZone.addEventListener('paste', (e) => {//文字貼付けイベント時の処理
            e.preventDefault();
            // クリップボードからテキストデータを取得
            const pastedText = e.clipboardData.getData('text');//文字貼付けたデータがクリップボード内にテキストデータとなる
            if (pastedText.trim() !== "") {
                // 1. グローバル変数（またはスコープ内の変数）にテキストを保存
                currentRawText = pastedText;
                // 2. ラジオボタンを「直接テキスト入力」に切り替える
                //const modeDirectInput = document.getElementById('modeDirect');
             //   if (modeDirectInput) {
             //       modeDirectInput.checked = true;
            if (modeDirectInput) { 
                currentFileInputMode='input'
            // 3. 画面の表示（表示非表示やボタンの制御）を更新する
            // 引数に模擬イベントを渡すか、null条件に対応させます
            //toggleMode({ target: modeDirectInput });
                    toggleMode();//modeDirectInput.dispatchEvent(new Event('change'));//toggleMode(null);
                    //上記処理で「addEventListener('change', toggleMode) が反応」するのでtoggleMode(null);と同じ処理　なのでtoggleModeに置換できるが                    
                }
                showFileInfo("貼り付けられたテキスト");
                displayCSV(pastedText);//文字の表示処理だがが文字コード変換は必要なし（文字コード変換はﾌｧｲﾙからの読出しで使うもの）
            }
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

        // キャンセルがクリックされた時の消去処理
        cancelClear.addEventListener('click', () => {
            tableContainer.innerHTML = ''; 
            fileInfo.style.display = 'none'; 
            ConceptInfo_top.style.display ='block'//ConceptInfo.style.display = 'flex'; 'flex'であったために大変苦しめられた 表の表示ｷｬﾝｾﾙでflexとなるためボタン位置が崩れた htmlとcssに原因なるとしてJSの確認を見逃してた
            body.style.overflowX = 'hidden';
            csvFile.value = ''; 
            cleanedTextForCopy = ''; // 保存データもリセット
            //window.scrollTo(0, 0);
            currentFileInputMode='file';//modeFileInput.checked = true;
            toggleMode();//toggleMode({ target: modeFileInput });
            // setTimeout(() => {
            //         window.scrollTo(0, 0);
            //     }, 0.00);
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
                saveCSVWithEncoding("exported_data.csv", cleanedTextForCopy);
            } catch (err) {
                alert('CSV保存に失敗しました: ' + err);
            }
        });

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

        clearBtn.addEventListener('click', () => {
            currentRawText = ''; // ← これを追加
            const textArea = document.getElementById('csvTextArea');
            if (textArea) {
                textArea.value = '';
            }
            // 必要であれば表やfileInfoもリセット
            //tableContainer.innerHTML = '';
            //fileInfo.style.display = 'none';
            //ConceptInfo.style.display = 'flex';
            cleanedTextForCopy = '';
        });
        
        function processFile(file) {//ファイル選択時、ファイル貼付け時呼び出される（テキスト貼付け時は呼び出されない）
            //const reader = new FileReader();
            loadFileWithAutoEncoding(file, (text, encoding) => {// loadFileWithAutoEncodingを実行した後以下を実行するということ
                currentRawText = text; // ファイル読み込み時も生テキストを記憶する
                lastDetectedEncoding = encoding;

                if (csvTextArea) { // csvTextArea（テキストエリア）が画面上に存在していれば
                    csvTextArea.value = text;
                }

                displayCSV(text);
            });            
            //reader.readreader.readAsText(file, getSelectedEncoding(file));AsText(file, 'Shift_JIS');
            //FileCode=file;
        }

        // CSVのテキストを分解してテーブルにする関数
        function displayCSV(text) {
            const lines = text.split(/\r?\n/); // /\r?\n/について([/]:正規表現を囲むマーク、[?]:「直前の文字が0回、または1回だけ存在する(\rがあってもなくてもいい)という意味」)\r：きゃりっじリターン、\nラインフィード
            let htmlParts = ['<table>'];//let htmlParts = '<table>';            
            let cleanedLines = []; // コピー用の行配列
            let seenLines = new Set(); // 重複チェック用のセットを追加
            const maxcntColumns = Math.max(...lines.map(line => splitCsvLine(line).length));
            //const maxcntColumns = Math.max(...lines.map(line => line.split(',').length));
            lines.forEach((line, index) => {//forEach((line:ループで今処理している要素のデータ,index:その順番（インデックス番号）)
                if (line.trim() === '') return; //forEach内のreturnはVBのContinue For （forを抜けるExit Forでなく）' これ以降の処理をスキップして、次のline（行）に進む
                let rowHtml = '';
                // カンマ、タブ、セミコロンのなどで区切れるように調整
                const cells = splitCsvLine(line);//const cells = line.split(/,|\t|;/);splitで line が "," の時長さ2の配列配列 ["", ""]を返す

                htmlParts.push('<tr>');//文字列でなく配列にするため htmlParts += '<tr>';
                let cleanedCells = []; // コピー用の空のセル配列
                
                cells.forEach(cell => {//cells配列を1つずつループ処理,取出した1つ分のデータを cell という変数名で扱う
                    // 前後の空白とダブルクォーテーションを自動で削除
                    //let cleanCell = cell.trim().replace(/^"|"$/g, '');trim()だと半角以外に全角スペースも対象にするので却下
                    let cleanCell = cell.replace(/^ +| +$/g, '').replace(/^"|"$/g, '');
                    //let cleanCell = cell.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '').replace(/^"|"$/g, '');//let cleanCell = cell.trim().replace(/^"|"$/g, '');                    
                    //g は 「マッチするものをすべて対象にする」(最初の1つだけでない)グローバル検索フラグ、[\s\u3000]は全角スペース(\u3000)半角スペース(\s)を合わせたもの
                    //+$ とは（末尾に1文字以上連続する
                    //+ ： 「直前の文字が1文字以上連続、$ ： 「文字列の末尾」（* ： 「直前の文字が0文字以上連続、. ： 「任意の文字(空文字含まず)」、.*：任意の文字が0回以上(任意の文字なのでどんな文字列でもよいとなる)
                    cleanedCells.push(cleanCell);//配列cleanedCellsの後ろに配列としてcleanCellを追加
                    
                    rowHtml += index === 0 ? `<th>${cleanCell}</th>` : `<td>${cleanCell}</td>`;
                    /*
                    if (index === 0) {
                        html2 += `<th>${cleanCell}</th>`;//${変数} を使って文字列の中に変数を埋め込む機能（テンプレートリテラル）としてﾊﾞｯｸｸｫｰﾂ（`）で囲む
                    } else {
                        html2 += `<td>${cleanCell}</td>`;
                    }
                    */
                });
                 // もし行全体のセルがすべて空っぽ（または無視された）ならスキップ
                if (cleanedCells.length === 0) return;

                // --- 重複検証行addCnmaLine ---
                //let addCnmaLine = cleanedCells.join(',');

                // ▼ 列数のズレを整える（チェックONのときだけ）
                if (chkColumnCnt && chkColumnCnt.checked) {
                  //  const maxColumns = GlobalmaxColumns || cleanedCells.length;//|| は「左側が “空” や “未定義” のとき、右側を使う」という意味
                  //  GlobalmaxColumns = Math.max(maxColumns, cleanedCells.length);

                    //while (cleanedCells.length < GlobalmaxColumns) {maxcntColumns
                    while (cleanedCells.length < maxcntColumns) {
                        cleanedCells.push('');
                        rowHtml += index === 0 ? `<th></th>` : `<td></td>`;
                    }

                    // 列数を揃えた後、addCnmaLine を作り直す
                   // addCnmaLine = cleanedCells.join(',');
                }
                
                let joinedLine = cleanedCells.join(',');
                // 1. まず要素が存在するかチェックし、2. さらにチェックがオンかを判定する
                if (chkdelcnm && chkdelcnm.checked) {
                    joinedLine = joinedLine.replace(/,+$/, '');//行末カンマ削除　←やってることは最後がカンマとならぬよう末尾カンマの削除での列数カウント（のための配列作成）
                }

                // --- 重複検証行 joinedLine ---
               
    
                // 1行目（ヘッダー）以外で、すでに同じ行が存在する場合はスキップ（重複削除）
                if (index > 0 && seenLines.has(joinedLine)) return;

                // 重複なし行を記録
                seenLines.add(joinedLine);
                htmlParts.push(rowHtml + '</tr>'); //htmlParts += rowHtml + '</tr>'; ← これだと文字列に変わってしまう！
                //htmlParts.push(rowHtml + '</tr>');               
                // クリーニングしたセルをカンマで再結合して（配列として）行に追加
                cleanedLines.push(joinedLine);
            });
            
            
            //htmlParts += '</table>';
            htmlParts.push('</table>');

            //tableContainer.innerHTML = htmlParts;
            tableContainer.innerHTML = htmlParts.join('');
            //tableContainer.innerHTML = htmlParts.join('');
            // クリーニング済みの全行を改行で結合して変数に格納
            cleanedTextForCopy = cleanedLines.join('\n');
            // 表示完了後、1秒後に表の位置までスクロール
            setTimeout(() => {
                tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1000);            
        }


        

        function splitCsvLine(line) {
            let result = [];
            let currentCell = "";
            let insideQuote = false; 

            // 1. 各チェックボックスのON/OFF状態（true/false）を取得
            const useComma     = document.getElementById('chkComma').checked;
            const useTab       = document.getElementById('chkTab').checked;
            const useSemicolon = document.getElementById('chkSemicolon').checked;
            const useSpace     = document.getElementById('chkSpace').checked;

            // 2. 半角スペースが有効な場合のみ、連続する半角スペースを1つにまとめる
            if (useSpace) {
                line = line.replace(/ {2,}/g, ' ');//{2,}は２つ以上の連続ということ、{2,4}のときは２つ以上4つ以下の連続といこと
            }

            for (let i = 0; i < line.length; i++) {
                let char = line[i];

                if (char === '"') {//"で囲って（例： "2,000"として）配列にいれている、その直後の cells.forEach ループで replace(/^"|"$/g, '')とするので
                    insideQuote = !insideQuote; // クォートの状態を反転
                    currentCell += char; 
                } else if (!insideQuote && (
                (char === ','  && useComma) ||
                (char === '\t' && useTab) ||
                (char === ';'  && useSemicolon) ||
                (char === ' '  && useSpace)
                )) {
                    result.push(currentCell);
                    currentCell = "";
                } else {
                    currentCell += char;
                }
            }
            result.push(currentCell); 
            return result;
        }

        /*
        document.addEventListener('DOMContentLoaded', () => {//スライドしたのイベントで、どちらの項目になったかを監視してその際の処理を記載
            //DOMContentLoaded が必要なのは、HTMLの読み込みが終わる前にスクリプトが実行される場合に、getElementById などがまだ存在しないDOMを
            //参照してしまうのを防ぐため、ただし、それは <head> の中や <body> より先にスクリプトを書いたが場合のことで、DOMContentLoadedはここでいらない
           DOMContentLoaded の中身を見ると、やっていることは3つだけ
           modeFileInput.addEventListener('change', toggleMode);
           modeDirectInput.addEventListener('change', toggleMode);
           convertBtn.addEventListener('click', ...);
           toggleMode(); // 初期表示の切り替え
           //
           //
           //
        */
           
           
            // モード切り替え要素の取得
            //const modeFileInput = document.getElementById('modeFile');
            //const modeDirectInput = document.getElementById('modeDirect');
            //const dropZone = document.getElementById('dropZone');
            //const directInputZone = document.getElementById('directInputZone');
            //const convertBtn = document.getElementById('convertBtn');
            /*
            // --- 【追加・修正】貼り付け（paste）イベントのスライド処理 ---
            if (dropZone) {//if (dropZone) となってるのは、htmlが読込まれるときdropZoneが存在する場合という条件の為だが、html読込中の処理とかは不要なのでいらない
                dropZone.addEventListener('paste', (e) => {　　//←この処理はすでに丈夫に同じ処理書いているので必要ない
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
                
                
                dropZone.addEventListener('dragover', (e) => {//上と被るからいらない
                    e.preventDefault(); // ドロップできるようにデフォルト挙動を制限
                });

                dropZone.addEventListener('drop', (e) => {//上と被るからいらない
                    e.preventDefault();
                    
                    // ドロップされたファイルを取得
                    const files = e.dataTransfer.files;
                    if (files.length === 0) return;

                    const file = files[0];
                    //const reader = new FileReader();
                    // ⭕ 修正後：async/await は不要。見やすく1つにまとまります
                    loadFileWithAutoEncoding(file, (fileText, encoding) => {
                        // 1. 変数にテキストを保存
                        if (typeof currentRawText !== 'undefined') {
                            currentRawText = fileText;
                            lastDetectedEncoding = encoding;
                        }

                        // 2. ラジオボタンを「直接テキスト入力」に切り替えてイベントを発生させる
                        if (modeDirectInput) {
                            modeDirectInput.checked = true;
                            modeDirectInput.dispatchEvent(new Event('change'));
                        }

                        // 3. データの解析と表示を実行
                        if (typeof showFileInfo === 'function') showFileInfo(file.name);
                        if (typeof displayCSV === 'function') displayCSV(fileText);
                    });
                    //FileCode=file;
                });               

            }
            */
        if (modeFileInput && modeDirectInput) {//切り替えスイッチのHTML要素が存在しているか？」を確認 存在しない場合エラーになる
        //切り替えスイッチのHTML要素が2つとも無事に見つかったときだけ、次の処理（イベント登録）に進む    
            // changeイベントを確実に登録
            //modeFileInput.addEventListener('change', toggleMode);//状態が『変化（change）』したら、toggleMode 
            //modeFileInput.addEventListener('change', toggleMode);
            modeFileInput.addEventListener('click', switchToFileMode);
            modeDirectInput.addEventListener('click', switchToDirectMode);//modeDirectInput.addEventListener('change', toggleMode);//という関数実施という命令（＝イベント時の処理の予約）
        }

        function toggleMode() {//function toggleMode(e) {
                // 1. イベントが発生した要素（どちらのラジオボタンが押されたか）を特定する
            // 引数 e があればそれを使い、なければブラウザの global event を参照する
            //const target = e ? e.target : null;//const target = event ? event.target : null; ←これだとグローバルの event とも解釈されるので 
            //↑addEventListener('change', toggleMode)のときはe = changeイベントでe.target = クリックされたラジオボタン本体
            //↑キャンセルボタン押されたときはe = ｷｬﾝｾﾙ(ﾎﾞﾀﾝ押された)イベントでe.target = 押されたボタン本体
            //「const target = e ? e.target : null;」とは、e がnullでなければ e.target をそうでなければnullをtarget の代入するといういみ
            //if (modeDirectInput.checked) {
            /*

            if  (currentFileInputMode==='input') {
                currentFileInputMode='file';
            }else{
                currentFileInputMode='input';
            }
            */
            if (currentFileInputMode==='input') {
                // 直接入力モード
                if(dropZone) dropZone.style.display = 'none';
                if(directInputZone) directInputZone.style.display = 'block';
                if(convertBtn) convertBtn.style.display = 'inline-block'; // ボタンを出す
                if(clearBtn) clearBtn.style.display = 'inline-flex'; // クリアボタンを出す

                // 【追加】記憶していたテキストを、テキストエリアに表示させる
                if (csvTextArea) {
                    csvTextArea.value = currentRawText;
                }
            } else {
                // ファイル選択モード
                // 【ここを修正】イベントの発生元が「ファイル選択（modeFileInput）」に切り替わった瞬間だけ保存する
                // これにより、超高速でイベントが連打されても、確実に切り替え前の値を1回だけ退避できます
                if (currentFileInputMode === 'file') {
                    if (csvTextArea) {
                        currentRawText = csvTextArea.value;
                    }
                }

                if(dropZone) dropZone.style.display = 'block';
                if(directInputZone) directInputZone.style.display = 'none';
                if(convertBtn) convertBtn.style.display = 'none'; // ボタンを隠す
                if(clearBtn) clearBtn.style.display = 'none'; // クリアボタンを隠す
            }
        }

        
        //toggleMode(); //初期設定として読んでいる（注：toggleModeの外で呼んでいる)　
//    });
