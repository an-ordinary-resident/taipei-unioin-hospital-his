# 慈愛院區 HIS：GitHub Pages 靜態版

此交付以正式網站第 30 版原始碼及 2026 年 11 月 18 日讀取的正式已刊登內容製作；未部署、覆寫或下架原 chatgpt.site 網站。

## 內容來源與匯出範圍

- 正式網址：https://taipei-unioin-hospital-his.ntuhminer978.chatgpt.site/
- 正式原始碼 commit：`d007830a110908953f86f31555108273f1ba259e`
- 已確認正式部署使用第 30 版；原封未動的正式原始碼另附於 `archive/production-source-v30.zip`。
- 公開內容：2 卷、20 篇章節（含附錄、間章等）、9 位人物、103 個辭典詞條、1 則已公開評論，以及首頁公告、主控台、系統聲明與新手教學設定。
- 正式資料庫工具會截斷長欄位，因此使用正式網站現有內容 API 匯出完整已刊登資料；使用網站原有「主治醫師」模擬閱讀層級取得人物設定及番外內容。沒有用桌面測試資料取代正式資料，也沒有匯入未刊登草稿、讀者識別金鑰或管理員憑證。
- 下載 16 張正式 R2 圖片；院徽、封面及 5 張預設角色頭像等原始靜態資源亦隨原始碼保留。詳見 `migration-report/assets-manifest.json`。
- **一個正式圖片引用已失效**：`settings.dashboard.dutyPortraits.person-1` 指向 `/api/media/4a94c3dd-f247-4053-90b0-430205b74e9d`，原站回傳 404。此為舊值班頭像設定；一般讀者識別證及人物檔案使用其他圖片。沒有自行假造原圖，遇到該引用時會顯示「原網站圖片無法取得」。您可在作者主控台重新上傳此頭像。

## 檔案位置

ZIP 根目錄已有可部署的 `index.html`、`app.css`、`assets/`、圖片資料夾、`content.json`、`content.js`、`config.js`、`.nojekyll`、`.github/` 與 `sync-offline.mjs`。

- `content.json`：完整公開內容的唯一線上來源。網址讀取失敗時，畫面會明示正在使用離線快照。
- `content.js`：從同一份 JSON 產生的離線快照。直接雙擊 `index.html` 時無須 fetch JSON、後端 API 或 CDN 即可閱讀。請完整解壓縮後開啟，不能只抽出一個 HTML。
- `source/`：改造後完整 React / Vite 原始碼、公開圖片、內容與測試。
- `archive/`：原正式版原始碼存檔，供保留或比對；不是這個靜態網站的運行來源。
- `migration-report/`：正式內容快照、下載清單、匯出統計與檢查報告。

網站使用 `#/dashboard`、`#/read/log-01` 等雜湊路由，支援 `https://帳號.github.io/儲存庫/` 的子目錄。舊網站的 `/read/log-01` 網址不會自動變成新網址，分享時請使用新網站「分享」按鈕。

## 首次部署到 GitHub Pages

1. 在 GitHub 建立您自己的儲存庫，預設分支使用 `main`。
2. 將 ZIP 根目錄的部署檔案上傳至儲存庫根目錄，確保根目錄能直接看到 `index.html` 與 `content.json`。`.github/workflows/pages.yml` 也必須上傳；Windows 若隱藏點開頭資料夾，請留意此項。
3. `source/`、`archive/` 與 `migration-report/` 不必上傳即可運行網站。若希望保存全部原始碼，也可上傳；附帶的工作流程只會公開運行所需的檔案。
4. 到儲存庫 **Settings → Pages → Build and deployment → Source**，選 **GitHub Actions**。
5. 到 **Actions → Publish HIS to GitHub Pages**，確認執行成功；若第一次未自動執行，可選 **Run workflow**。
6. 開啟 Pages 提供的網址。若儲存庫不是 `main` 分支，請同步修改工作流程的 `branches` 及作者發布中心的分支設定。

此工作流程只整理靜態檔案，不需要伺服器、資料庫或額外的付費主機。每次 `content.json` 更新，工作流程會由最新 JSON 重建離線快照再部署。

## 設定 Google 作者登入

管理員白名單已設為 **an.ordinary.resident@gmail.com**。Google OAuth Web Client ID 尚未提供，所以預設保持空白；閱讀不受影響，作者登入會顯示設定提示。

1. 在 Google Cloud Console 建立或選取專案，設定 OAuth 應用程式品牌與同意畫面。
2. 建立 **Web application** 類型的 OAuth Client ID。
3. 在 **Authorized JavaScript origins** 加入 `https://您的帳號.github.io`，只填 origin，不加儲存庫路徑。若使用自訂網域，也加入該 HTTPS origin。
4. 若 Google 應用程式仍處於測試狀態，將管理員信箱加入測試使用者。此版使用 JavaScript callback，無須建立後端 redirect 接收網址。
5. 編輯根目錄 `config.js` 的 `googleClientId`，填入以 `.apps.googleusercontent.com` 結尾的 Client ID；**不要填入 Client Secret**。
6. 將修改後的 `config.js` 提交 GitHub，等待部署完成，再從網站側欄選「作者登入」。使用指定 Google 信箱登入即可開啟完整作者工作台。
7. 若未來重新由原始碼建置，亦須將相同設定填入 `source/public/config.js`，避免建置覆蓋成空白。

此版會驗證 Google ID Token 的 RSA 簽章、issuer、audience、有效期、nonce、管理員信箱與 `email_verified`，不是只解碼 email。登入資訊留於記憶體；重新整理或憑證到期後需再次登入。Google 登入本身需連網，且不能在 `file://` 離線模式使用。

純前端登入只負責顯示編輯介面。所有隨靜態網站刊登的小說與人物設定皆屬可下載資料，模擬職級不是保密措施。**真正的儲存庫寫入權限由 GitHub Token 控制**；任何訪客即使修改本機畫面，也不會因此取得您的 Token 或寫入權限。

## 作者編輯、草稿與發布

原有病程、人物、辭典、主控台、聲明、新手教學編輯介面與文字格式工具保留。作者工作區、草稿及新上傳圖片儲存於此瀏覽器 IndexedDB；Token 與 Repo 設定依需求儲存在 localStorage。

1. **儲存草稿**：僅保存到此瀏覽器，不影響公開內容，也不會包含在 `content.json` 下載檔中。
2. **加入待發布**：將該篇或詞條放入本機待發布內容。作者可以預覽，但其他讀者尚未更新。
3. **發布更新**：將所有待發布內容同步至 GitHub 的 `content.json`；等待 GitHub Actions 完成後讀者才會看到新版。未加入待發布的其他草稿仍保留在本機。
4. **下載最新 content.json**：取得包含待發布修改的完整公開資料，供手動上傳；不包含未刊登草稿、Token 或個人閱讀紀錄。
5. **下載工作備份（含草稿）**：供私人留存、救援或人工合併，請不要將這份工作備份當作公開 `content.json` 上傳。本版未提供工作備份一鍵匯入。

共用註釋以 `glossaryId` 連結，刊登詞條後，讀者會從辭典取得最新解說。同名但沒有明確連結的舊註釋不會被覆寫，解除連結的專用吐槽仍獨立。未刊登的共用詞條草稿不會經由章節發布而外洩。

### 方式 A：直接同步 GitHub

在發布中心展開「GitHub 儲存庫設定」，填入 owner、repo、branch 與 Personal Access Token。建議使用 fine-grained PAT，只選目標儲存庫，授權 **Contents: Read and write**；不必將 Token 放進 config.js、原始碼或 GitHub Secrets。可隨時按「清除 Token」。

首次需先完成整包部署；此介面只更新已存在的根目錄 `content.json`。送出前會比對遠端內容與編輯基準，並附上 GitHub SHA。若他人或其他裝置已更新，會拒絕覆寫；請先下載工作備份，再按「載入儲存庫最新內容」後人工合併。

新上傳圖片會內嵌於 JSON 的資源表，所以只提交 `content.json` 即可連同新圖片更新。既有正式圖片仍以本地 `media/` 保存，不重複塞入 JSON。單張上傳上限 8 MB，使用小尺寸圖片可減少每次更新的檔案大小。

### 方式 B：手動上傳

下載最新 `content.json` 後，覆蓋 GitHub 儲存庫根目錄同名檔案並提交，Actions 即會部署。若要保留一份最新的離線資料夾，也需在資料夾內執行 `node sync-offline.mjs` 以更新 `content.js`。直接改 JSON 不會自動改掉電腦上舊的離線快照。

## 純靜態環境的差異

- 閱讀設定、識別證、最後閱覽位置、段落書籤、教學狀態保存在每個瀏覽器。無法從原 chatgpt.site 網域自動讀取使用者 Cookie，也無法跨裝置同步。
- 原站已公開的評論保留。新增訪客留言與按讚改為「本機」記錄，只有同一瀏覽器看得到；介面有明確提示。作者評論可以加入公開 JSON 並發布。
- 原資料庫的全站閱覽數、按讚總數、讀者裝置識別資料沒有搬入公開 JSON。新頁面的數字標示為本機閱覽／本機喜歡。需要跨讀者的即時留言或統計時，須另接外部留言／統計服務；單靠 GitHub Pages 無法安全承接匿名寫入。
- 原稿空行、章節分段與排除空白的閱讀進度邏輯沿用正式版。
- 既有內容的文字、圖片比例、院區導覽、讀者工具、角色分級及特殊格式均沿用正式版。失效的那張舊值班頭像請重新上傳。

## 原始碼重新建置

在 `source/` 內使用 Node.js 22.13 以上及 pnpm：

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm test
pnpm run dev
```

`build` 輸出純靜態檔至 `source/dist/`，`dev` 以 `http://127.0.0.1:4188/test-repo/` 預覽建置結果。原始碼修改後請重新 build。若只修改公開內容，先將部署根目錄最新的 `content.json` 複製到 `source/content.json` 再建置，避免以舊快照覆蓋新資料。

輸出使用一般 script（不是瀏覽器 ES module）及相對資源路徑；React、編輯器與樣式已編譯在本地檔案。唯一必須連網的功能是 Google 登入、GitHub 同步及外部參考連結。

## 驗證範圍

已執行 production build 與 6 組核心自動測試，並以本機子目錄 URL 檢查讀者主控台、章節、註解、作者登入前後介面、草稿保存與重新登入恢復、辭庫搜尋及格式編輯。

Google 真實登入與 GitHub 真實提交尚未實測：目前未取得您的 Client ID、GitHub 儲存庫及 PAT。測試使用隔離的簽章與 API fixture，正式交付不含測試登入入口或假憑證。

內建瀏覽器限制 `file://` 導航，因此未能實際雙擊驗證。已檢查一般 script 載入、離線初始化、完整 JSON 快照與相對資源路徑。請解壓縮後以 Chrome 或 Edge 雙擊根目錄 `index.html` 確認您的瀏覽器設定允許本機腳本。

設定參考：[Google GIS 設定](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)、[Google ID Token 驗證](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)、[GitHub Contents API](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents)、[GitHub Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
