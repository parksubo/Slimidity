# Slimidity
개발중입니다
## 소개
Slimidity는 ethereum 환경에서 돌아가는 NFT Game Dapp 입니다.

게임에서 사용되는 NFT인 슬라임을 통해 게임을 즐길 수 있습니다. 

마켓플레이스(웹)를 통해 슬라임을 사고 팔 수 있고, 브리딩을 할 수 있습니다.

나만의 슬라임을 통해 게임을 즐겨보세요!

## 사용 기술

React, TypeScript (Rendering, Logic)

web3.js (frontend <-> contract 상호작용 라이브러리)

MetaMask (chrome extension, 유저 계정 지갑)

react-router-dom

postcss-modules, postcss-module-values, bootstrap (style)

material-ui (React Component: Slider)

Solidity (Contract)

Unity (Game)

web3.unity (https://github.com/ChainSafe/web3.unity)

netlify (Game deployment web server)

## 구조
### Contract
```
📦contracts
┣ 📜GeneScience.sol
┣ 📜SlimeBase.sol
┣ 📜SlimeBreed.sol
┗ 📜SlimeSale.sol
```
### Frontend
```
📦src
 ┣ 📂common
 ┃ ┣ 📜DataTypes.ts
 ┃ ┣ 📜colors.css
 ┃ ┗ 📜size.css
 ┣ 📂components
 ┃ ┣ 📂Breeding
 ┃ ┃ ┣ 📜NFTCard.module.css
 ┃ ┃ ┗ 📜NFTCard.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.module.css
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂Marketplace
 ┃ ┃ ┣ 📂Filter
 ┃ ┃ ┃ ┣ 📜RangeSlider.module.css
 ┃ ┃ ┃ ┗ 📜RangeSlider.tsx
 ┃ ┃ ┣ 📜DropDownSearch.tsx
 ┃ ┃ ┣ 📜NFTCard.module.css
 ┃ ┃ ┗ 📜NFTCard.tsx
 ┃ ┗ 📂MyNFTPage
 ┃ ┃ ┣ 📜NFTCard.module.css
 ┃ ┃ ┗ 📜NFTCard.tsx
 ┣ 📂contracts
 ┃ ┗ 📜index.ts
 ┣ 📂icons
 ┃ ┣ 📜arrow-left-solid.svg
 ┃ ┣ 📜arrow-right-solid.svg
 ┃ ┗ 📜caret-up-solid.svg
 ┣ 📂images
 ┃ ┣ 📜IceSlime.png
 ┃ ┗ 📜heart.png
 ┣ 📂routes
 ┃ ┣ 📂Breeding
 ┃ ┃ ┣ 📜Breeding.module.css
 ┃ ┃ ┗ 📜Breeding.tsx
 ┃ ┣ 📂Game
 ┃ ┃ ┣ 📜Game.module.css
 ┃ ┃ ┗ 📜Game.tsx
 ┃ ┣ 📂Main
 ┃ ┃ ┗ 📜Main.tsx
 ┃ ┣ 📂Marketplace
 ┃ ┃ ┣ 📜Marketplace.module.css
 ┃ ┃ ┗ 📜Marketplace.tsx
 ┃ ┗ 📂MyNFTPage
 ┃ ┃ ┣ 📜MyNFTPage.module.css
 ┃ ┃ ┗ 📜MyNFTPage.tsx
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```
## 게임 방법 (Game)

### 1. MetaMask 계정을 통해 ethereum network에서 로그인
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172171345-45c8a0cd-47a5-44d5-bb3d-ecc27322a312.png">

### 2. Go! 버튼으로 게임 시작
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172171711-f5070baa-5862-4c0e-b118-3ef682c76621.png">

### 3. 게임 조작 키
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172171838-31fd982a-5eda-4c28-addd-f9e6e99748aa.png">

#### 이동: 방향키

#### 점프: SpaceBar

#### 공격: Shift

### 4. 리더보드 (Ranking)
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172172780-266493de-6cb3-4543-aff7-77617955479f.png">

#### 플레이어들의 랭킹을 볼 수 있습니다.

### 5. 퀘스트 (Daily Mission)
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172174042-fb318cd7-cc01-46ff-b2f4-8d00e55ce7c7.png">
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/33623078/172174534-a3a778a4-4dc0-43ea-84ed-4d4e2fbcfee8.png">

#### 각 항목별 조건을 완료하면 보상 토큰(STK)를 받을 수 있습니다.

## 마켓플레이스 이용 방법

### 1. MetaMask 계정을 통해 ethereum network에서 로그인
<img width="1476" alt="image" src="https://user-images.githubusercontent.com/33623078/171035832-037b6e3f-253d-4d0a-8643-cc02e2503a47.png">
<img width="1475" alt="image" src="https://user-images.githubusercontent.com/33623078/171036309-a19ba204-232a-47ac-87c1-883e4f4dbcdc.png">

### 2. 슬라임 구매 (Marketplace)
1. 원하는 슬라임을 골라 Buy버튼을 클릭
<img width="1476" alt="image" src="https://user-images.githubusercontent.com/33623078/171036555-3d9b52c0-c43d-4a81-973e-6c5f5939f52f.png">
2. 이더리움을 지불하여 구매
<img width="1475" alt="image" src="https://user-images.githubusercontent.com/33623078/171036667-5f2eccfe-2d29-46e4-adf8-54e583f6a3f6.png">

### 3. 슬라임 판매 (나의 NFT)

#### 초기 설정
1. 슬라임을 판매 가능하게 승인해야 판매할 수 있습니다. 한번만 수행하면 됩니다.
<img width="1476" alt="image" src="https://user-images.githubusercontent.com/33623078/171037099-736c115c-6420-4d61-8dae-003be0d5265f.png">

#### 초기 설정 이후
1. 슬라임의 판매가격을 설정하고, 판매하기 버튼을 클릭
<img width="1476" alt="image" src="https://user-images.githubusercontent.com/33623078/171037517-ef2b6d21-8243-4f3e-9f74-769c213e3998.png">
2. 판매중인 상태
<img width="1448" alt="image" src="https://user-images.githubusercontent.com/33623078/171037926-16cafe7a-65a1-45db-82d7-907a5da0d04f.png">

### 4. 브리딩 (Breeding)

#### 슬라임 2개를 교배하여 새로운 슬라임을 만들 수 있다!

1. 브리딩을 원하는 슬라임 2개 선택 후 브리딩 하기 버튼 클릭
<img width="1448" alt="image" src="https://user-images.githubusercontent.com/33623078/171038354-4a878ab8-65a0-45b8-8cac-493af7061f40.png">
2. 새로운 슬라임이 만들어진 모습
<img width="1448" alt="image" src="https://user-images.githubusercontent.com/33623078/171038428-1a6e0481-8e53-416d-b668-8705538391a4.png">

### youtube 링크
https://www.youtube.com/watch?v=QQM2ABM1K6k&t=3s

