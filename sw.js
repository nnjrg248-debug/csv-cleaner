// サービスワーカーのインストールイベント
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

// サービスワーカーのアクティベートイベント
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

// インストール可能にするために必須のフェッチイベント（空でもOK）
self.addEventListener('fetch', (event) => {
  // ここは空欄のままでPWAの条件をクリアできます
});
