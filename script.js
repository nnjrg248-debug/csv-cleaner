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
        const Lookseikei = document.getElementById('Lookseikei');
        const convertBtn = document.getElementById('convertBtn');
        const clearBtn = document.getElementById('clearBtn');
        const chkColumnCnt = document.getElementById('chkColumnCnt');
        const chkdelcnm = document.getElementById('chkdelcnm');
        const encoding_labelid = document.getElementById('encoding_labelid');
        const separator_labelkid = document.getElementById('separator_labelkid');
        // 【追加】直接入力用のテキストエリア（HTMLのIDに合わせてください）
        const csvTextArea = document.getElementById('csvTextArea');
        const body = document.body;

        const encodingLabel = document.getElementById('encoding_labelid');
        const encodingDialog = document.getElementById('encoding_dialog');
        const report_dialog = document.getElementById("report_dialog");
        //const sampleDialog = document.getElementById("sampleDialog");
        const Mojibakebtn= document.getElementById("Mojibakebtn");
        const separatorBlock = document.getElementById('separatorblock');
        const kugiriDialog = document.getElementById('kugiri_dialog');
        const zoompopup = document.getElementById('zoom-popup');
        const zoomButtons = document.querySelectorAll('.zoom-btn');
        const zoominput = document.getElementById('zoom-input');
        const bottomActions = document.querySelector(".button-blue-row");
       // const separator_labelkid = document.getElementById('separator_labelkid');
        //const encodingInputs = document.querySelectorAll('.setting-block input[name="encoding_mode"], .setting-block input[name="utf8_bom"]');//文字コード欄内のrんこーどのらひおボックスとbomのチェックボックス


        // コピー対象となる「クリーニング済みのテキスト」を一時保存する変数
        let cleanedTextForCopy = "";
        let GlobalmaxColumns=0;//let GlobalmaxColumns = "";でもよいが　0代入が自然
        // 【追加】貼り付けられた生テキストを記憶しておく変数
        let currentRawText = ""; 
        let currentFileInputMode = 'file'; // 現在のモードを記憶する変数
        //let chkMojicode = document.getElementById('chkMojicode');
        //let chkMojicodeflg;
        const encodingRadios = document.querySelectorAll('input[name="encoding_mode"]');
        const bomCheckbox = document.getElementById('utf8_with_bom');
        // HTMLのクラス名「.bom-option」に完全に合わせる
        //const bomOptionGroup = document.querySelector('.bom-option');
        const setting_block = document.querySelector('.setting-block');

        //const pageValue = document.querySelector('meta[name="page"]').getAttribute('content');
        const pageValue = document.querySelector('meta[name="page"]')?.content;

        //const setAll = document.getElementById('setAll');
        //const setSelect = document.getElementById('setSelect');
        let lastReportHtml;
        let lastReportText;
        let zoomflg;



        switch (pageValue) {// 2. switch文の中は「画面の表示・非表示の切り替え」以外の処理は書かない
            case '1':
            case '6':
          //      if(setAll)setAll.style.display ='none';//index.html時に表示される文字ｺｰﾄﾞﾗｼﾞｵﾎﾞﾀﾝ
             //   if(setSelect)setSelect.style.display = 'none';//index.html以外で表示される文字ｺｰﾄﾞパネル
                //if(chkMojicode)chkMojicode.style.display = 'block'; 
                break;
            default:
             //   if(setAll)setAll.style.display ='none';
            //    if(setSelect)setSelect.style.display = 'block';
                //separatorBlock.style.backgroundColor= '#AAAAAA';
                break;
        }

        
        switch (pageValue) {
            case '1':
                //bomCheckbox.disabled=false;
                break;
            default:
                const encodingblock = document.getElementById('encodingblock');
                const separator_labelkid = document.getElementById('separator_labelkid');
               // const encoding_labelid = document.getElementById('encoding_labelid');
                console.log("現在読み込まれているHTML内のすべてのID:", document.querySelectorAll('[id]'));

                document.querySelector('.tool-area').style.marginTop = '0px';
                //separatorBlock.style.backgroundColor= '#AAAAAA';
                separatorBlock.style.display="none"
                
                separator_labelkid.style.border= "2px solid blue";
                separator_labelkid.style.backgroundColor= '#cccccc';
                separator_labelkid.style.display = "flex";
                separator_labelkid.style.justifyContent = "center"; // 横方向の中央
                separator_labelkid.style.alignItems = "center";     // 縦方向の中全
                separator_labelkid.style.fontSize="1.8rem";
                separator_labelkid.style.fontWeight="700";
                //separator_labelkid.style.color="#FFFFFF";
                separator_labelkid.style.width="100%"
                separator_labelkid.style.height="83px"
                //encodingblock.style.width="100%"
                //encodingblock.style.backgroundColor="blue"

                encodingblock.style.display="none"  
                encoding_labelid.style.border= "2px solid blue";
                encoding_labelid.style.backgroundColor= '#b4c5f5';
                encoding_labelid.style.display = "flex";
                encoding_labelid.style.justifyContent = "center"; // 横方向の中央
                //encoding_labelid.style.alignItems = "center";     // 縦方向の中全
                encoding_labelid.style.alignItems = "flex-start"; // 上揃えにする
                encoding_labelid.style.paddingTop = "15px";      // 上側に15pxの余白（数値は調整してください）
                encoding_labelid.style.fontSize="1.42rem";
                encoding_labelid.style.fontWeight="700";
                encoding_labelid.style.width="100%"
                //encoding_labelid.style.marginTop="";
                encoding_labelid.innerHTML="【文字コード】：自動判定<br>▼ クリックで変更";
                
                const sonotcheck = document.querySelector('.sonotcheck');
                const ToolNasi = document.querySelector('.ToolNasi');
      
                ToolNasi.style.height="5.2rem";
                sonotcheck.style.height="5.45rem";

                const separateInputs = document.querySelectorAll('.setting-block input[name="separate"]');                    
                separateInputs.forEach(target => {                                
                        target.disabled = true;
                        target.checked  = false;
                    });
               // const topTitle = document.querySelector('.top-title');
               // topTitle.innerHTML="@CSVクレンジングツール"
                const mainTitle = document.querySelector('.main-title');
                //mainTitle.innerHTML="ブラウザだけで使える@CSVクレンジングツール"
                mainTitle.innerHTML = 'ブラウザだけで使える　<span style="color: orange;">@</span>　CSVクレンジングツール <br><span class="tool-name">CSVスッキリ</span>';
                const descrip = document.querySelector('.sub-title .description P');
                /*descrip.innerHTML="CSVスッキリは、CSVの@クレンジング・整形ができる無料オンラインツールです。<br>" 
                                +"文字化け、区切りズレ、不要な改行や重複行の修正などを一瞬で解決。<br>"
                                +"ファイルはサーバー送信なしの安心設計です。";
                const descripcont = document.querySelector('.sub-title .description-container');
                   */       
                switch (pageValue) {
                case '2':                    
                    document.getElementById('chkTab').checked  = true;  
                    //topTitle.innerHTML = topTitle.innerHTML.replace('@', '[TSV→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[TSV→CSV] 変換専用');
                    //descrip.innerHTML = descrip.innerHTML.replace('@', '[TSV→CSV]変換専用');    
                    //descripcont.style.width="60%" 
                    separator_labelkid.innerHTML="【区切り文字】：タブ"
                    //separatorBlock.style.fontSize = "18px"; 
                           
                    break;
                case '3':
                    document.getElementById('chkSemicolon').checked  = true;  
                    //topTitle.innerHTML = topTitle.innerHTML.replace('@', '[セミコロン→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[セミコロン→CSV] 変換専用');
                    //descrip.innerHTML = descrip.innerHTML.replace('@', '[セミコロン→CSV]変換専用');
                    //descripcont.style.width="62%"
                    separator_labelkid.innerHTML="【区切り文字】：セミコロン"        
                    break;
                case '4':
                    document.getElementById('chkSpace').checked  = true; 
                   // topTitle.innerHTML = topTitle.innerHTML.replace('@', '[半角スペース→CSV]変換専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', '[半角スペース→CSV] 変換専用');
                   // descrip.innerHTML = descrip.innerHTML.replace('@', '[半角スペース→CSV]変換専用');
                  //  descripcont.style.width="62%"
                    separator_labelkid.innerHTML="【区切り文字】：半角スペース"    
                    break;
                case '5':
                    document.getElementById('chkComma').checked  = true; 
                    //topTitle.innerHTML = topTitle.innerHTML.replace('@', 'CSVクレンジング専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', 'CSVクレンジング専用（CSV→CSV）');
                  //  descrip.innerHTML = descrip.innerHTML.replace('@', 'CSVクレンジング専用');
                  //  descripcont.style.width="62%"
                    separator_labelkid.innerHTML="【区切り文字】：カンマ"    
                    break;
                case '6':
                    document.getElementById('chkComma').checked  = true; 
                //    topTitle.innerHTML = topTitle.innerHTML.replace('@', 'CSV文字化け修正専用');
                    mainTitle.innerHTML = mainTitle.innerHTML.replace('@', 'CSV文字化け修正専用');
                //    descrip.innerHTML = descrip.innerHTML.replace('@', 'CSV文字化け修正専用');
               //     descripcont.style.width="62%"
                    separator_labelkid.innerHTML="【区切り文字】：カンマ"    

                    //separatorBlock.style.backgroundColor= '#AAAAAA';
                    //bomCheckbox.disabled=false;
                    break;

        }
    }
   
    /*
    //if(chkMojicode){chkMojicodeの表示非表示のもとになるsetA.style.displayで判定　表示非表示にchkMojicodeオブジェクトに変化はないから
    if( set && set.style.display === 'block' ){//ラジオボタン式文字コード選択形式以外の表示とき(つまりindex.htmlでないとき)
        chkMojicode.addEventListener('change', () => {//文字コードダイアログで文字コード選択を変更したときの処理の登録
    if( set && set.style.display === 'block' ){//ラジオボタン式文字コード選択形式以外の表示とき(つまりindex.htmlでないとき)
        chkMojicode.addEventListener('change', () => {//文字コードダイアログで文字コード選択を変更したときの処理の登録
            const encodingInputs = document.querySelectorAll('#mode_auto, #mode_utf8, #utf8_with_bom, #mode_sjis');          
            encodingInputs.forEach(target => { //上記 '#mode_auto, ・・で示す各文字ｺｰﾄﾞのﾙｰﾌﾟで対象の文字ｺｰﾄﾞのﾗｼﾞｵﾎﾞﾀﾝをtargetとしている                     
            encodingInputs.forEach(target => { //上記 '#mode_auto, ・・で示す各文字ｺｰﾄﾞのﾙｰﾌﾟで対象の文字ｺｰﾄﾞのﾗｼﾞｵﾎﾞﾀﾝをtargetとしている                     
                    target.disabled = !chkMojicode.checked;
        });
        if(!(document.getElementById('mode_utf8').checked))
            document.getElementById('utf8_with_bom').disabled=true;
        //chkMojicode.dispatchEvent(new Event('change'));  
        const encodingBlock = document.getElementById('encodingblock');
        // --- 背景色の切り替え処理 ---
        if (chkMojicode) { 
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
*/     



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



        
        //sampleデータ置き場
        async function loadSample(path) {
            try {
                const response = await fetch(path);

                if (!response.ok) {
                    alert("ファイルが見つかりません: " + path);
                    return;
                }

                //const text = await response.text();
                //文字化け対応の為 response.text() ではなく、生のデータ（Blob）として受け取る
                const blob = await response.blob();

                // 2. loadFileWithAutoEncoding が使えるように File オブジェクトに変換する
                const fileName = path.split("/").pop();
                const file = new File([blob], fileName, { type: "text/csv" });

                // 3. すでに作成してある自動判定・読み込み関数にファイルを渡す
                loadFileWithAutoEncoding(file, (text, encoding) => {
                    
                    console.log(`サンプル読み込み成功（文字コード: ${encoding}）`);

                    // 4. これまで行っていた「読み込み完了後の処理」をここに引っ越す
                    // csvTextArea.value = text; // 必要に応じてコメントアウトを解除してください
                    showFileInfo(fileName);
                    
                    // CSV 表示処理を実行
                    displayCSV(text);
                    switchToDirectMode();
                    csvTextArea.value = text;//csvTextArea.value = text;の位置はdisplayCSV(text)の上showFileInfo(fileName);の下でいいのでないかも時間あるとき調べる
                });

            } catch (e) {
                alert("サンプルデータの読み込みに失敗しました");
                console.error(e);
            }
        }

        // ダイアログ開閉
        const sanpdlog = document.getElementById("sampleDialog");

        document.getElementById("btnOpenSampleDialog").addEventListener("click", () => {
            sanpdlog.showModal();
        });

        document.getElementById("btnCloseSampleDialog").addEventListener("click", () => {
            sanpdlog.close();
        });

        // サンプル選択ボタン
        document.querySelectorAll(".sampleBtn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const path = btn.dataset.path;
                await loadSample(path);
                sanpdlog.close();
            });
        });


        Mojibakebtn.addEventListener("click", () => {
            Mojibaketaiou();                
        });


       
/*
  Mojibakebtn.addEventListener("click", () => {
         //  Mojibaketaiou();                
        });
        
        
 document.getElementById("Mojibakebtn").addEventListener("click", () => {
            alert(1);//   Mojibaketaiou();                
        });


*/

        function Mojibaketaiou() {
            if (csvTextArea.value===""){
             	alert("文字が入力されてません。");
             	return;
             }
			let text=csvTextArea.value;			 
            const mode = getSelectedEncoding();
			currentRawText = text; // ファイル読み込み時も生テキストを記憶する
            //lastDetectedEncoding = encoding;
            if (mode === 'AUTO') {              
                try {
                      
                     csvTextArea.value= restoreSjisThenConvertToutf8PJ(text);
                     
                    } catch (e) {
                        // 3. どれでも読めなかった → 対応外
                        alert("このファイルは UTF-8 でも Shift-JIS  でもありません。対応外です。");
                        callback("", "UNKNOWN");//エラーが起きたときでも、画面の処理（バトンリレー）を途中で止めずに、最後まで安全に終わらせるため実行される
                    }
            } else {
                // --- 【手動選択モード（UTF-8 / Shift_JIS）】 ---
                    if(mode==='UTF-8'){
                        csvTextArea.value = restoreSjisThenConvertToutf8PJ(text);
                    }else{
                        csvTextArea.value=text;
                    }
            }
        }



        



        function switchToFileMode() {
            currentFileInputMode = 'file';
            toggleMode();
        }

        function switchToDirectMode() {
            currentFileInputMode = 'input';
            toggleMode();
        }


        function showReportDialog(title, message, extraHtml = "") {
            report_dialog.innerHTML = `
                <div class="report-box">
                    <h2 class="report-title">${title}</h2>
                    <div class="report-body">
                        ${message}
                        ${extraHtml}
                    </div>
                    <div class="report-actions">
                        <button id="closeReport" class="btn-close">閉じる</button>
                    </div>
                </div>
            `;

            report_dialog.showModal();

            document.getElementById("closeReport").addEventListener("click", (e) => {
                e.stopPropagation();//外枠押下でzoompopupが消えるのでこの関数のクリックが連鎖して消えぬように
                report_dialog.close();
                if(zoomflg===1)
                    zoompopup.style.display = 'block';

                if(zoomflg===1)
                    zoompopup.style.display = 'block';

                zoomflg=0;
            });
        }


        function updateBomStatus() {
            // 1. 各要素を関数内で確実に取得する（「使用不可」エラーの防止）
            //const bomCheckbox = document.getElementById('utf8_with_bom');
            //const setAll = document.getElementById('setAll');
            //const chkMojicode = document.getElementById('chkMojicode');
            const modeUtf8 = document.getElementById('mode_utf8');

            // 必須の要素がなければ処理をスキップ
            if (!bomCheckbox || !modeUtf8) return;

            // 2. ラジオボタン「UTF-8」が選ばれているか
            const isUtf8Selected = modeUtf8.checked;

            // 3. 【新仕様の判定ロジック】
            let isEnabled = false;

            if (setAll && setAll.style.display === 'block') {
                // ◆ setAll が見えているとき：UTF-8がONなら活性
                isEnabled = isUtf8Selected;
            } else {
                // ◆ setAll が見えないとき：UTF-8がON、かつ chkMojicodeがONなら活性
                //const isMojicodeChecked = chkMojicode ? chkMojicode.checked : false;
                //const isMojicodeChecked = true;
                //isEnabled = isUtf8Selected && isMojicodeChecked;
                isEnabled = isUtf8Selected;
            }

            // 4. 判定結果をBOMチェックボックスに反映（有効なら disabled = false）
            bomCheckbox.disabled = !isEnabled;
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

/*
function restoreSjisThenConvertToUtf8IfUnicode(text) {
   const sampleText = text.slice(0, 2000);

const strArray = [];
for (let i = 0; i < sampleText.length; i++) {
    strArray.push(sampleText.charCodeAt(i));
}

// 2. 切り出した軽いデータで、ライブラリに「この文字コードは何？」とはっきり判定させる
const detectedType = Encoding.detect(strArray);

// 3. 【判断】もし文字化け（UNICODE）だとはっきり判断できたら、
// この時だけ、ファイル全体（text）の修復処理を実行する
return detectedType;
}
*/





function restoreSjisThenConvertToUtf8IfUnicode(text) {
    // 💡 安全装置：万が一 text が空っぽ（undefinedなど）なら即座に NORMAL を返す
    if (!text) return 'NORMAL';

    // 1. 高速化のため、先頭2000文字だけを切り出す（あなたの優れたアイデア）
    const sampleText = text.slice(0, 2000);

    // -------------------------------------------------------------
    // 【アプローチ1】文字パターンチェック（あなたとGeminiの合体版）
    // -------------------------------------------------------------
    const superMojibakePattern = /[縺繧髢譁鬮隧螟謌蛟螳蠎蠑蝣蠖蠢蠡蠧邨荳譛譌譎譏譟]|(莉[ｲｲ・]|蜷[√・]|驕[・])/;
    
    if (superMojibakePattern.test(sampleText)) {
        return 'MOJIBAKE'; // 特徴的な文字化け漢字があればその場で確定
    }

    // -------------------------------------------------------------
    // 【アプローチ2】文字固定なしのバイナリチェック（保険用の自動判定）
    // -------------------------------------------------------------
    try {
        // 引数に bytes がないので、渡された化け文字列(sampleText)から、
        // 誤認された原因である Shift_JIS の数値（配列）を一時的に作り直します
        const strArray = [];
        for (let i = 0; i < sampleText.length; i++) {
            strArray.push(sampleText.charCodeAt(i));
        }
        const sampleBytes = Encoding.convert(strArray, { to: 'SJIS', from: 'UNICODE' });

        // 作り直した数値配列をライブラリに渡し、本来の文字コードを判定させます
        const detectedType = Encoding.detect(sampleBytes);
        const mode = getSelectedEncoding();

        // 画面で Shift_JIS系 を選んでいるのに、データの正体が UTF-8 だった場合
        if (detectedType === 'UTF8' && (mode === 'SJIS' || mode === 'Shift_JIS')) {
            return 'MOJIBAKE'; 
        }
    } catch (e) {
        // 逆変換中にエラーが起きた場合は、文字化けファイルではないためスルー
    }

    return 'NORMAL';
}



function restoreSjisThenConvertToutf8PJ(text) {
    // 2000文字の高速判定で「文字化け」と出たときだけ、ファイル全体を直す
    if (restoreSjisThenConvertToUtf8IfUnicode(text) === 'MOJIBAKE') {    
        const strArray = [];
        for (let i = 0; i < text.length; i++) {
            strArray.push(text.charCodeAt(i));
        }                    
        const sjisBytes = Encoding.convert(strArray, { to: 'SJIS', from: 'UNICODE' });
        const utf8Bytes = Encoding.convert(sjisBytes, { to: 'UNICODE', from: 'UTF8' });
        text = Encoding.codeToString(utf8Bytes);
    }
    return text;
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
                    //const detectedEncoding = judgeEncodingFromBytes(bytes);

                    let detectedEncoding = judgeEncodingFromBytes(bytes);
                    
                        //detectedEncoding = 'CP932'; // 髙などを壊さずに読み込むための対策しかし対応してないブラウザでエラーになるので却下

                    try {
                            const textDecoder = new TextDecoder(detectedEncoding);
                            //const text = textDecoder.decode(bytes);
                            let text = textDecoder.decode(bytes);               
                            text=restoreSjisThenConvertToutf8PJ(text);      
                            //text = perfectCsvCleaner(text);
                            callback(text, detectedEncoding);
                    } catch (e) {
                            // 3. どれでも読めなかった → 対応外
                            alert("このファイルは UTF-8 でも Shift-JIS  でもありません。対応外です。");
                            callback("", "UNKNOWN");//エラーが起きたときでも、画面の処理（バトンリレー）を途中で止めずに、最後まで安全に終わらせるため実行される
                    }
                    
                };
            } else {
                // --- 【手動選択モード（UTF-8 / Shift_JIS）】 ---
                if(mode==='UTF-8'){
                    reader.readAsText(file, mode);
                    reader.onload = (readerEvent) => {
                        let text = readerEvent.target.result;                       
                        text=restoreSjisThenConvertToutf8PJ(text);
                        text = perfectCsvCleaner(text);
                        callback(text, mode);
                    };
                }else if(mode==='Shift_JIS'){
                    //reader.readAsText(file, mode);
                    reader.readAsArrayBuffer(file); 

                    reader.onload = (readerEvent) => {
                        // 2. ファイルの生データ（バイト配列）を取得
                        const arrayBuffer = readerEvent.target.result;
                        const uint8Array = new Uint8Array(arrayBuffer);
                        
                        // 3. 一度「Shift_JIS（CP932）」のふりをしてテキスト化する
                        //    ※これによって「ɘa」という文字化け文字列が一旦完成します
                        //const sjisDecoder = new TextDecoder('cp932');cp932では対応してないブラウザはエラーになる
                        const sjisDecoder = new TextDecoder('Shift_JIS');
                        const mojibakeText = sjisDecoder.decode(uint8Array);
                        
                        // 4. その文字化け文字列を、前回のロジックで本来の「UTF-8」へと逆変換する
                        const encoder = new TextEncoder();
                        const encodedBytes = encoder.encode(mojibakeText);
                        
                        const utf8Decoder = new TextDecoder('utf-8'); // 本来の文字コードでデコード
                        let text = utf8Decoder.decode(encodedBytes);

                        // 5. 綺麗になったテキストをクリーナーにかける
                        text = perfectCsvCleaner(text);
                        callback(text, mode);  
                     
                    };                    
                }
                                /*

                //reader.readAsText(file, mode);
                    reader.readAsText(file, 'CP932');
                    reader.onload = (readerEvent) => {
                        let text = readerEvent.target.result;  
                        text = perfectCsvCleaner(text);
                        callback(text, mode); 


                reader.readAsText(file, mode);
                reader.onload = (readerEvent) => {
                    let text = readerEvent.target.result;
                    if(mode==='UTF-8'){
                        text=restoreSjisThenConvertToutf8PJ(text);     
                    }        
                    callback(text, mode);
                };
                */
            }
        }




        
        // （参考）前回の判定関数も合わせてここに配置しておきます
        function judgeEncodingFromBytes(bytes) {//自動判定の際sjisかutf8かを自動判定する
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

        /**
         * 【完全網羅版】CSVテキスト内の環境依存文字・特殊文字をすべて標準文字に変換・クレンジングする
         * @param {string} csvText - 読み込んだCSVのテキストデータ
         * @returns {string} クレンジング済みのCSVテキスト
         */
        function perfectCsvCleaner(csvText) {
            if (!csvText) return '';

            // 1. 超高精度・異体字＆環境依存文字マッピング（数千字の規格から実務必須なものを徹底網羅）
            const charMap = {
                // --- 【超頻出】苗字・名前の異体字・旧字体（JIS第3・第4水準） ---
                '髙': '高', '﨑': '崎', ' 﨑': '崎', '德': '徳', '賴': '頼', '瀨': '瀬', '敬': '敬', 
                '緖': '緒', '黑': '黒', '寬': '寛', '莊': '荘', '裵': '裴', '瑩': '蛍', '榮': '栄',
                '聰': '聡', '蔥': '葱', '濵': '浜', '簗': '梁', '栁': '柳', '塚': '塚', '塚': '塚',
                '淸': '清', '豬': '猪', '敎': '教', '神': '神', '福': '福', '橫': '横', '羽': '羽',
                '滿': '満', '綠': '緑', '緖': '緒', '緣': '縁', '縣': '県', '縱': '縦', '纖': '繊',
                '薰': '薫', '歲': '歳', '產': '産', '卽': '即', '鄕': '郷', '竈': 'かまど',
                
                // 渡辺・斉藤などの超多レイヤー文字対策
                '邉': '辺', '邊': '辺', '邊': '辺', '邉': '辺',
                '齊': '斉', '齋': '斎', '齋': '斎', '齊': '斉',
                
                // --- 【システム天敵】ローマ数字（全角・半角・大文字・小文字） ---
                'Ⅰ': 'I', 'Ⅱ': 'II', 'Ⅲ': 'III', 'Ⅳ': 'IV', 'Ⅴ': 'V',
                'Ⅵ': 'VI', 'Ⅶ': 'VII', 'Ⅷ': 'VIII', 'Ⅸ': 'IX', 'Ⅹ': 'X',
                'i': 'i', 'ii': 'ii', 'iii': 'iii', 'iv': 'iv', 'v': 'v',
                'vi': 'vi', 'vii': 'vii', 'viii': 'viii', 'ix': 'ix', 'x': 'x',

                // --- 【システム天敵】丸数字・囲み文字（1〜20、50まで網羅） ---
                '①': '(1)', '②': '(2)', '③': '(3)', '④': '(4)', '⑤': '(5)',
                '⑥': '(6)', '⑦': '(7)', '⑧': '(8)', '⑨': '(9)', '⑩': '(10)',
                '⑪': '(11)', '⑫': '(12)', '⑬': '(13)', '⑭': '(14)', '⑮': '(15)',
                '⑯': '(16)', '⑰': '(17)', '⑱': '(18)', '⑲': '(19)', '⑳': '(20)',
                '㉑': '(21)', '㉒': '(22)', '㉓': '(23)', '㉔': '(24)', '㉕': '(25)',
                '㉖': '(26)', '㉗': '(27)', '㉘': '(28)', '㉙': '(29)', '㉚': '(30)',
                '㉛': '(31)', '㉜': '(32)', '㉝': '(33)', '㉞': '(34)', '㉟': '(35)',
                '㊱': '(36)', '㊲': '(37)', '㊳': '(38)', '㊴': '(39)', '㊵': '(40)',
                '㊶': '(41)', '㊷': '(42)', '㊸': '(43)', '㊹': '(44)', '㊺': '(45)',
                '㊻': '(46)', '㊼': '(47)', '㊽': '(48)', '㊾': '(49)', '㊿': '(50)',
                
                // --- 略号・単位・その他環境依存文字 ---
                '㈱': '(株)', '㈲': '(有)', '㈹': '(代)', '㍿': '株式会社',
                '№': 'No.', '℡': 'TEL', '㊤': '(上)', '㊥': '(中)', '㊦': '(下)',
                '㎡': '平米', '㍑': 'リットル', '㌘': 'グラム', '㌢': 'センチ',
                '粍': 'ミリ', '糎': 'センチ', '籵': 'デカ', '粭': 'ヘクト',
                '粯': 'キロ', '絛': 'タオ', '㎝': 'cm', '㎏': 'kg', '㏾': '賀',

                // --- 【データ破壊の原因】波ダッシュ・記号・全角クォーテーション類 ---
                '〜': '～', // Windows/Mac間の波ダッシュ問題
                '―': '—',  // ダッシュ
                '‐': '-',  // ハイフン
                '￥': '\\', // 通貨記号
                '：': ':',  // 全角コロン
                '；': ';',  // 全角セミコロン
                '”': '"',  // CSVの構造を破壊する全角ダブルクォーテーション
                '’': "'",  // 全角シングルクォーテーション
                '“”': '""',
                '・': '･'
            };

            // 2. まず既知の環境依存文字をマッピングベースで一括置換
            const regex = new RegExp(Object.keys(charMap).join('|'), 'g');
            let cleanedText = csvText.replace(regex, (match) => charMap[match]);

            // 3. 【最重要】サロゲートペア（4バイト文字：「𠮷（つちよし）」や「𠮶」など）の一括安全置換
            // マッピングから漏れた未知の4バイト文字（古いシステムに突っ込むと100%エラーになる文字）を
            // 標準的な漢字に変換、または安全な代替文字（■）に置換します。
            cleanedText = cleanedText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (match) => {
                // 代表的なサロゲートペア漢字の救済
                const surrogateMap = {
                    '𠮷': '吉', // つちよし
                    '𠮶': '口',
                    '𠀋': '丈', // 右上に点の丈
                    '𡈽': '土',
                    '𠮷': '吉'
                };
                return surrogateMap[match] || '■'; // 救済リストにない未知の4バイト文字は「■」にしてシステム停止を防ぐ
            });

            // 4. 【ダメ押し】IBM拡張文字・NEC選定IBM拡張文字（CP932特有の文字）のJISセーフティネット
            // Unicodeのブロック範囲を指定し、日本の古いシステムでエラーになりやすい記号・特殊文字を「■」に置換
            // CJK互換漢字（環境依存の漢字群：U+F900〜U+FAFF）を安全に処理
            cleanedText = cleanedText.replace(/[\uF900-\uFAFF]/g, '■');

            return cleanedText;
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
                // データのどこかに混ざっているBOMを、まずは一括ですべて強制削除（リセット）
                const cleanText = text.replace(/^\uFEFF/gm, '');

                if (isBom) {
                    // BOMあり指定なら、綺麗になったテキストの「一番最初」に1つだけBOMを置く
                    blob = new Blob(['\uFEFF' + cleanText], { type: 'text/csv;charset=utf-8;' });
                    finalFilename = "exported_data_utf8_bom.csv";
                } else {
                    // BOMなし指定なら、綺麗になったテキストをそのまま保存
                    blob = new Blob([cleanText], { type: 'text/csv;charset=utf-8;' });
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
        /*  
        encoding_labelid.addEventListener('click', function() {
            // ここにクリックされたときの処理を書きます
            alert('文字コードがクリックされました！'); 
            
            // 例：さっき非表示にしたブロックを再表示するなら
            // encodingBlock.style.display = "block";
        }); 
        */
        // 1. ラベルをクリックしたら、alert風にポップアップを表示する
        encoding_labelid.addEventListener('click', () => {
            const encodingDialog = document.getElementById('encoding_dialog');
            encodingDialog.showModal(); // showModalを使うことで後ろの操作をロックできます
        });

        // 2. ポップアップ内のボタンが押された時の処理
        encodingDialog.addEventListener('close', () => {
            // どのボタン（value値）が押されたかを取得
            const selectedValue = encodingDialog.returnValue;//ダイアログ内で押されたボタンの値がreturnValueに入る

            // ｷｬﾝｾﾙ又は!selectedValue(=returnValue) が空（""）(⁼「何も選ばれずに閉じられた場合」)の時は何もしない
            if (selectedValue === 'cancel' || !selectedValue) return;

            document.getElementById('mode_auto').checked = false;
            document.getElementById('mode_utf8').checked = false;
            document.getElementById('utf8_with_bom').checked = false;
            document.getElementById('mode_sjis').checked = false;

            // 選択された値に応じて元の設定（非表示にしているラジオボタン）と連動させる
            if (selectedValue === 'auto') {
                document.getElementById('mode_auto').checked = true;
                encodingLabel.innerHTML = "【文字コード】：自動判定<br>▼ クリックで変更";
            } else if (selectedValue === 'utf8') {
                document.getElementById('mode_utf8').checked = true;
                document.getElementById('utf8_with_bom').checked = false;
                encodingLabel.innerHTML = "【文字コード】：UTF-8<br>▼ クリックで変更";
            } else if (selectedValue === 'utf8_bom') {
                document.getElementById('mode_utf8').checked = true;
                document.getElementById('utf8_with_bom').checked = true;
                encodingLabel.innerHTML = "【文字コード】：UTF-8 (BOM)<br>▼ クリックで変更";
            } else if (selectedValue === 'sjis') {
                document.getElementById('mode_sjis').checked = true;
                encodingLabel.innerHTML = "【文字コード】：Shift-JIS<br>▼ クリックで変更";
            }

            // 必要に応じて、ここにCSVの再変換処理の関数（例: convertCSV(); など）を呼び出す
        });
         

        // 1. ラベルをクリックしたら、alert風にポップアップを表示する
        
        if(pageValue==='6'){
            separator_labelkid.style.backgroundColor= '#b4c5f5';
            separator_labelkid.addEventListener('click', () => {
                const kugiriDialog = document.getElementById('kugiri_dialog');
                kugiriDialog.showModal(); // showModalを使うことで後ろの操作をロックできます
            });
        }

        // 2. ポップアップ内のボタンが押された時の処理
        kugiriDialog.addEventListener('close', () => {
            // どのボタン（value値）が押されたかを取得
            const selectedValue = kugiriDialog.returnValue;

            // キャンセルされた場合は何もしない
            if (selectedValue === 'cancel' || !selectedValue) return;

            document.getElementById('chkComma').checked = false;
            document.getElementById('chkTab').checked = false;
            document.getElementById('chkSemicolon').checked = false;
            document.getElementById('chkSpace').checked = false;

            // 選択された値に応じて元の設定（非表示にしているラジオボタン）と連動させる
            if (selectedValue === 'kanme') {
                document.getElementById('chkComma').checked = true;
                separator_labelkid.innerHTML = "【区切り文字】：カンマ<br>▼ クリックで変更";
            } else if (selectedValue === 'tab') {
                document.getElementById('chkTab').checked = true;
                separator_labelkid.innerHTML = "【区切り文字】：タブ<br>▼ クリックで変更";
            } else if (selectedValue === 'semi') {
                document.getElementById('chkSemicolon').checked = true;
                separator_labelkid.innerHTML = "【区切り文字】：セミコロン<br>▼ クリックで変更";
            } else if (selectedValue === 'han') {
                document.getElementById('chkSpace').checked = true;
                separator_labelkid.innerHTML = "【区切り文字】：半角スペース<br>▼ クリックで変更";
            }

            // 必要に応じて、ここにCSVの再変換処理の関数（例: convertCSV(); など）を呼び出す
        });



        // 列数ずれ直しチェックボックスイベントを設定
        chkColumnCnt.addEventListener('change', () => {
        // チェックがついている（true）ときだけ実行する
            if ((chkColumnCnt.checked) &&(csvTextArea.value)) {//if (csvTextArea.value === '')よりif (csvTextArea.value)のほうが予期せぬバグが起きにくい頑丈なコードとのこと
               // displayCSV(csvTextArea.value);
            }
        });
        

        // ラジオボタンが変更されたら状態を更新するイベントを設定
        encodingRadios.forEach(radio => {
            radio.addEventListener('change', updateBomStatus);
        })

        

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
                
                setTimeout(() => {
                tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1000);   
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

        // 【追加】直接入力モード中に「表形式ボタン」を押しても動作するように設定
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
                    displayCSV(inputText);//文字の表示処理（文字コード変換は必要なし（文字コード変換はﾌｧｲﾙからの読出しで使うもの））
               
                    setTimeout(() => {
                        tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 1000);   
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

        Lookseikei.addEventListener('click', () => {
             if (!lastReportHtml) {
                alert("まだ整形結果がありません");
                return;
            }
            showReportDialog(
                "整形完了！",
                lastReportHtml,
                `<pre>${lastReportText}</pre>`
            );
        });
     


        /* 1. ポップアップを開くボタンの処理
        openBtn.addEventListener('click', (event) => {
        zoompopup.style.display = 'block';
        event.stopPropagation(); // bodyのクリックイベントを発火させない
        });
        */

        // 2. ポップアップ自体をクリックした時の処理
        zoompopup.addEventListener('click', (event) => {
        // ポップアップ内の操作でbodyのクリックイベント（消える処理）が動かないようにブロック
        event.stopPropagation();
        });

        // 3. 縮尺率（ズーム）を変更する処理
        zoomButtons.forEach(button => {
        button.addEventListener('click', () => {
            const scale = button.getAttribute('data-size');
            
            // body全体の縮尺を変更する
            document.body.style.zoom = scale;
            
            // 【重要】ポップアップ自体が一緒に拡大縮小されるのを防ぐ（等倍に固定）
            zoompopup.style.zoom = 1 / scale; 
            });
        });

        // 4. HPのbody（ポップアップの外側）を触ると消える処理
        // bodyだけでなく、ドキュメント全体（空白部分含む）のクリックを検知できるようにdocumentに変更
        document.addEventListener('click', () => {
        zoompopup.style.display = 'none';
        });
        
        // 3. 数値調節（NumericUpDown）が変更された時の処理
        zoominput.addEventListener('input', () => {
        // 入力された値（例: 120）を倍率（例: 1.2）に変換
        let percent = parseFloat(zoominput.value);

        /*
        // 未入力や異常な値のガード処理
        if (isNaN(percent)) return;
        if (percent < 50) percent = 50;   // 最小値制限
        if (percent > 200) percent = 200; // 最大値制限
        */

        const scale = percent / 100;

        // body全体の縮尺を変更する
        document.body.style.zoom = scale;
        
        // ポップアップ自体が一緒に拡大縮小されるのを防ぐ
        zoompopup.style.zoom = 1 / scale; 
        });

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

        
        function processFile(file) {//ファイル選択時、ファイル貼付け時呼び出される（テキスト貼付け時は呼び出されない）
            //const reader = new FileReader();
            loadFileWithAutoEncoding(file, (text, encoding) => {// loadFileWithAutoEncodingを実行した後以下を実行するということ
                currentRawText = text; // ファイル読み込み時も生テキストを記憶する
                lastDetectedEncoding = encoding;

                if (csvTextArea) { // csvTextArea（テキストエリア）が画面上に存在していれば
                    csvTextArea.value = text;
                }

                displayCSV(text);

                setTimeout(() => {
                tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 1000);   
                zoomflg=1;
                //popup.style.display = 'block';
            });            
            //reader.readreader.readAsText(file, getSelectedEncoding(file));AsText(file, 'Shift_JIS');
            //FileCode=file;
        }
            
        function HankakuAsshuku(text, delimiters) {
            // 半角スペースが区切り文字に含まれていたら圧縮
            if (delimiters.includes(" ")) {
                text = text.replace(/ {2,}/g, " ");
            }
            return text;
        }

        function parseCSV(text) {//「カンマ区切りの文字列（CSV）を配列やJSONのデータ構造にパース（解析・分解）するライブラリ

            let warnings = []; 
            

            // 1. 区切り文字を配列で取得
            const delimiters = [];
            if (chkComma.checked)     delimiters.push(",");
            if (chkTab.checked)       delimiters.push("\t");
            if (chkSemicolon.checked) delimiters.push(";");
            if (chkSpace.checked)     delimiters.push(" ");
            // ★ 区切り文字なし → 1 行をそのまま 1 セルとして扱う（今までの仕様）
            if (delimiters.length === 0) {
                const lines = text.split(/\r?\n/);//?:直前の\r が「0 回または 1 回」(「*」の場合は直前文字が0回以上)
                return lines.map(line => [line]);  // ← 1 行 = 1 セル　　　　
            }//\r:キャリッジリターン（CR）＝ Windows の改行の前半、\n:ラインフィード（LF）＝ 改行本体、\r\n:Windows改行コード、\n:Linux改行コード

            text = text.replace(/^\uFEFF/, "");//BOM除去　後ほどpapaparseで削除するがより確実にするため
            // 2. 前処理（スペース圧縮など）
            text = HankakuAsshuku(text, delimiters);

            // 3. 最初の区切り文字でパース
            let result = Papa.parse(text, {//正式仕様（RFC4180）に沿って引用符内のカンマ、改行、""のｴｽｹｰﾌﾟ、BOM等のCSV処理関数
                delimiter: delimiters[0],
                skipEmptyLines: true,//改行スキップ処理
                bom: true   // ★ BOM を自動削除
            });//resultはPapaParse が返す「解析結果ｵﾌﾞｼﾞｪｸﾄ」でその中のdataﾌﾟﾛﾊﾟﾃｨは2次元配列
            let rows = result.data;//rows:(行と区切り文字で区切られた)2次元配列」例：[ ["Tom","Jones","Director"], ["Ian","Dury","Engineer"] ]

            // 4. 2つ目以降の区切り文字で再パース
            for (let i = 1; i < delimiters.length; i++) {
                const d = delimiters[i];               
                rows = rows.map(row => {//←2次元配列rowsの1要素rowに対し毎回以下の関数(=処理)を繰り返すﾏｰｸ
                    let newRow = [];
                    row.forEach(cell => {//rowは2次元配列の1要素でcellはその中の1要素：[ ["Tom","Jones","Director"], ・・のなかの"Tom"等
                        // 1つのセルの中に、別の区切り文字（タブやスペースなど）が含まれていたらさらに分割する
                        if (cell.includes(d)) {
                            // Papa.parse を使ってセルの中身だけを安全にパースする
                            const parsedCell = Papa.parse(cell, { delimiter: d }).data[0];
                            newRow = newRow.concat(parsedCell);
                        } else {
                            newRow.push(cell);
                        }
                    });
                    return newRow;
                });
            }
             // ★ 5. 【追加】行末の空セル削除（チェックがある場合のみ）
            if (chkdelcnm.checked) {
                rows = rows.map(row => {
                    let i = row.length - 1;//rowは二次元配列要素の1行配列データでrow[i]はその最後尾の配列
                    // 配列の末尾から順に、空文字（または前後の空白を消して空になるもの）を探す
                    while (i >= 0 && (row[i] === '' || row[i].replace(/^ +| +$/g, '') === '')) {
                        i--;
                    }
                    // 空ではない最後の要素までの部分配列を切り出す
                    return row.slice(0, i + 1);
                });
            }

            let expectedCols = null;
            rows.forEach((row, index) => {
                if (expectedCols === null) expectedCols = row.length;

                if (row.length !== expectedCols) {
                    warnings.push({
                        type: "列数異常",
                        line: index + 1,
                        expected: expectedCols,
                        actual: row.length,
                        raw: row.join(delimiters[0])
                    });
                }
            });
            rows.forEach((row, index) => {
                const rawLine = row.join(delimiters[0]);

                const hasDelimiter = delimiters.some(d => rawLine.includes(d));

                if (!hasDelimiter && row.length === 1) {
                    warnings.push({
                        type: "区切り文字異常",
                        line: index + 1,
                        message: "区切り文字が見つかりません",
                        raw: rawLine
                    });
                }
            });

            rows.forEach((row, index) => {
                const rawLine = row.join(delimiters[0]);
                const quoteCount = (rawLine.match(/"/g) || []).length;

                if (quoteCount % 2 !== 0) {
                    warnings.push({
                        type: "クォート不整合",
                        line: index + 1,
                        message: "ダブルクォートが閉じていません",
                        raw: rawLine
                    });
                }
            });

            const originalLines = text.split(/\r?\n/);

            originalLines.forEach((line, index) => {
                if (line.trim() === "") {
                    warnings.push({
                        type: "空行",
                        line: index + 1,
                        message: "空行を検出しました"
                    });
                }
            });

            rows.forEach((row, index) => {
                const rawLine = row.join(delimiters[0]);
                if (!looksLikeUTF8(rawLine)) {
                    warnings.push({
                        type: "文字化け疑い",
                        line: index + 1,
                        message: "UTF-8 として不正なバイト列の可能性",
                        raw: rawLine
                    });
                }
            });
            
            //return rows;
            return { rows, warnings };
        }

        function looksLikeUTF8(str) {
            try {
                new TextEncoder().encode(str);
                return true;
            } catch {
                return false;
            }
        }

   

        function displayCSV(text) {

            const { rows, warnings } = parseCSV(text); // ← 文字処理とパースは別関数に任せる

            let htmlParts = ['<table>'];
            let cleanedLines = [];
            let seenLines = new Set();

            const maxcntColumns = Math.max(...rows.map(r => r.length));

            rows.forEach((cells, index) => {

                let rowHtml = '<tr>';
                let cleanedCells = [];

                cells.forEach(cell => {
                    // 前後の空白とダブルクォーテーションを削除
                    let cleanCell = cell
                        .replace(/^ +| +$/g, '')   // 前後の半角スペースを削除
                        .replace(/^"|"$/g, '');    // 前後のダブルクォーテーションを削除
                    cleanedCells.push(cleanCell);

                    rowHtml += (index === 0 && chkOneROW.checked)     //先頭行ならth、それ以外はtd
                        ? `<th>${cleanCell}</th>`
                        : `<td>${cleanCell}</td>`;
                });

                // 列数揃え
                if (chkColumnCnt.checked) {
                    while (cleanedCells.length < maxcntColumns) {
                        cleanedCells.push('');
                        rowHtml += (index === 0 && chkOneROW.checked) ? `<th></th>` : `<td></td>`;
                    }
                }

                let joinedLine = cleanedCells.join(',');//配列cleanedCellsをカンマで区切りくっつける

              

                if (index > 0 && seenLines.has(joinedLine)) return;
                seenLines.add(joinedLine);// 1行目（ヘッダー）以外で、すでに同じ行が存在する場合はスキップ（重複行削除）

                htmlParts.push(rowHtml + '</tr>');//htmlParts += rowHtml + '</tr>'; ← これだと文字列に変わるので
                cleanedLines.push(joinedLine);
            });

            htmlParts.push('</table>');
            tableContainer.innerHTML = htmlParts.join('');
            cleanedTextForCopy = cleanedLines.join('\n');

           ReportShori(rows,maxcntColumns,cleanedLines,cleanedTextForCopy,warnings); 
           //↑普通こんな長々と出なく連想配列でスマートに渡す
            
        }

        function ReportShori(irows,iColumns,icleanedLines,icleanedText,iwarnings){
            const fileName = document.getElementById("fileName")?.textContent || "（直接入力）";
            //基本情報の取得
            const now = new Date().toLocaleString();
            //const fileName = document.getElementById("fileName")?.textContent || "（直接入力）";
            let status = "成功";
            //サマリーの計算
            const totalRows = irows.length;
            const validRows = icleanedLines.length;
            const removedRows = totalRows - validRows;
            //適用された整形ルールの収集
            let appliedRules = [];
            if (chkOneROW.checked) appliedRules.push("1行目をヘッダーとして扱う");
            if (chkColumnCnt.checked) appliedRules.push("列数揃え");
            if (chkdelcnm.checked) appliedRules.push("行末カンマ削除");
            appliedRules.push("重複行削除"); // seenLines を使っているため

            // --- 【修正箇所】チェックされている区切り文字を取得してテキストにする ---
            let selectedDelimiters = [];
            if (document.getElementById("chkComma")?.checked) selectedDelimiters.push("カンマ");
            if (document.getElementById("chkTab")?.checked) selectedDelimiters.push("タブ");
            if (document.getElementById("chkSemicolon")?.checked) selectedDelimiters.push("セミコロン");
            if (document.getElementById("chkSpace")?.checked) selectedDelimiters.push("半角スペース");
            
            // 例：「カンマ, タブ」のように文字で結合（何もなければ "なし"）
            const delimiter = selectedDelimiters.length > 0 ? selectedDelimiters.join(", ") : "なし";
            // -----------------------------------------------------------------





            let reportHtml = `
            <h3>基本情報</h3>
            <p>処理日時：${now}</p>
            <p>ファイル名：${fileName}</p>
            <!--<p>ステータス：${iwarnings.length > 0 ? "警告あり" : "成功"}</p>-->
            <h3>処理サマリー</h3>            
            <p>総レコード数：${totalRows}</p>
            <p>有効レコード数：${validRows}</p>
            <p>除外レコード数：${removedRows}</p>
            <p>（整形後）列数：${iColumns}</p>
            <p>区切り文字：${delimiter}</p>
            <h3>適用された整形内容</h3>
            <ul>${appliedRules.map(r => `<li>${r}</li>`).join("")}</ul>
            `;

            if (iwarnings.length > 0) { //エラー処理まだ公開できないので当分　falseをくっつけて飛ばす
            //if (iwarnings.length > 0 && false) {
                reportHtml += `
                <h3>警告・エラー</h3>
                <ul>
                ${iwarnings.map(w => `
                    <li>行 ${w.line}：${w.message || w.type}</li>
                    `).join("")}
                </ul>
                `;
            }//messageが空の時あるので type を fallback （代替値）に使う

            lastReportHtml=reportHtml;
            lastReportText=icleanedText;
            showReportDialog("整形完了！",reportHtml,`<pre>${icleanedText}</pre>`);
        }






        
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
                if(Lookseikei) Lookseikei.style.display = 'inline-block';
               // if(Mojibakebtn) Mojibakebtn.style.display = 'inline-block';
                if(clearBtn) clearBtn.style.display = 'inline-flex'; // 絵が入ってるのでinline-flex
                if(cancelClear) cancelClear.style.display = 'inline-block'; 
                bottomActions.classList.add("adjusted");//肌色ライン下げる

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
                if(Lookseikei) Lookseikei.style.display = 'none';
                if(Mojibakebtn) Mojibakebtn.style.display = 'none';
                if(clearBtn) clearBtn.style.display = 'none'; // クリアボタンを隠す
                if(cancelClear) cancelClear.style.display = 'none'; // ボタンを隠す
                bottomActions.classList.remove("adjusted");//肌色ライン上げる
            }
        }

        
        //toggleMode(); //初期設定として読んでいる（注：toggleModeの外で呼んでいる)　
//    });
