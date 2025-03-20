# SurveyAngular - 前端 (Angular)

## 專案簡介
這是一個基於 Angular 的動態問卷管理系統前端，提供問卷創建、展示、提交等功能。使用者可以輕鬆地創建和管理問卷，並根據需求發送給目標群體進行填寫。

## 技術
- **前端**: Angular
- **後端**: Java Spring Boot（API 支持）
- **資料庫**:: MySQL（由後端處理）
啟動指南
1. 安裝所需依賴：
  ```bash
  npm install
  ```

2. 啟動前端：
  ```bash
  ng serve
  ```
這會啟動開發伺服器，並將應用程式運行在 http://localhost:4200/。
## 文件結構
```
/angular
 ├── src
 │    ├── app
 │    │    ├── @service
 │    │    │    ├── date.service.ts
 │    │    │    ├── http-client.service.ts
 │    │    │    ├── login.service.ts
 │    │    │    ├── session.service.ts
 │    │    │    └── validator.service.ts
 │    │    ├── component
 │    │    │    └── search
 │    │    │         └── search.component.html
 │    │    ├── dialog
 │    │    │    ├── edit-memberinfo-dialog
 │    │    │    └── option-dialog
 │    │    ├── pages
 │    │    │    ├── admin
 │    │    │    ├── login
 │    │    │    ├── not-found
 │    │    │    └── user
 │    │    ├── app.component.html
 │    │    └── app.component.ts
 ├── angular.json
 ├── package.json
 └── tsconfig.json
```

## 結構說明
```
@service: 用來存放所有的服務文件，如處理 HTTP 請求、驗證、日期處理等。

date.service.ts：處理日期的服務。
http-client.service.ts：用來與後端進行 HTTP 請求的服務。
login.service.ts：處理登錄相關邏輯。
session.service.ts：管理用戶會話的服務。
validator.service.ts：處理驗證邏輯的服務。
component: 存放一些可重用的 UI 元件，這裡只有 search 這個組件。

search.component.html：搜索框或相關組件的 HTML 模板。
dialog: 用來存放應用中的對話框或彈窗組件。

edit-memberinfo-dialog：編輯用戶信息的對話框組件。
option-dialog：選項選擇的對話框組件。
pages: 包含應用程式中不同的頁面組件，每個頁面對應一個功能模塊。

admin：管理員頁面。
login：登錄頁面。
not-found：頁面未找到頁面。
user：用戶頁面。
app.component.html 和 app.component.ts：根組件，通常負責應用的根結構和路由設置。
```

## 功能說明
問卷管理功能: 使用者可以創建新問卷、查看現有問卷並編輯。
問題設置功能: 每個問卷可以包含多個問題，並且支援不同類型的問題（選擇題、填空題等）。
提交與回應: 用戶可以填寫問卷並提交答案，後端負責處理並存儲提交的回應。
