# ExcelConverter

> 실제 <a href ='https://luxiai.co.kr/'>루시아이</a> 회사에서 판매되고 있는 상품을 DB에 저장하고 엑셀 파일로 목록을 만드는 단순 반복 작업을 **자동화** 해주는 프로그램 입니다.
> 
> 이 프로그램을 통해 엑셀 파일 작업 시간을 `1시간 -> 10분`으로 절약시켰습니다.
>
> 1인 프로젝트로 진행하였고  프론트엔드는 `ReactJs`  백엔드는 `firebase, AWS lambda`  배포는 `firbase`를 사용하였습니다.

## 🛠️Stack
<p align="center">
  <img src="https://img.shields.io/badge/React-v17.0.2-blue" />
  <img src="https://img.shields.io/badge/firebase-v9.6.6-black" />
  <img src="https://img.shields.io/badge/styledComponents-v5.3.3-brightgreen" />
  <img src="https://img.shields.io/badge/Recoil-v0.7.4-lightgrey" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/exceljs-v4.3.0-green" />
  <img src="https://img.shields.io/badge/reactBeautifulDnd-v13.1.0-pink" />
  <img src="https://img.shields.io/badge/VSCode-blue" />
</p>

## 데이터 저장 Page
### image
<img width="75%" alt="스크린샷 2023-05-11 오후 10 00 25" src="https://github.com/bae-sh/ExcelConverter/assets/37887690/73af9310-4426-4031-8b41-9af841408aff">

### 설명
- 상품을 DB에 저장하는 page 입니다.
- 하나의 상품에는 사진, 다양한 언어의 이름, 수량 등등의 데이터가 포함되어 있습니다.
- 이 데이터는 `firestore에 NOSQL` 방식으로 저장되며 하나의 상품당 하나의 문서로 관리됩니다.

<br/>
<br/>

## 데이터 목록 Page
### video
https://github.com/bae-sh/ExcelConverter/assets/37887690/62f88e6d-8f51-4b25-9f32-d4ef1c1fcb39

### 설명
- DB에 저장된 상품을 관리하는 Page 입니다.
- 무역에 필요한 달러, 위안의 환율 정보와 각 상품의 관세 비율(HSCODE)를 `관세청 OPEN API`를 통해 받아옵니다.
- 관세청 정보를 받아오던 중 CORS 정책을 해결하기 위해 `AWS lambda` 함수를 프록시 서버로 이용하였습니다. (<a href = 'https://velog.io/@bae-sh/%EA%B3%B5%EA%B3%B5-%EB%8D%B0%EC%9D%B4%ED%84%B0-API%EB%A5%BC-%ED%86%B5%ED%95%B4-%ED%99%98%EC%9C%A8%EC%9D%84-%EB%B0%9B%EC%95%84%EC%98%A4%EC%9E%90'>Velog</a>)
- 특정 수식을 통하여 예상 원가를 알 수 있습니다.

<br/>
<br/>

## 데이터 수정 Page
### video
https://github.com/bae-sh/ExcelConverter/assets/37887690/cd439f91-c932-427a-bef2-591bc6062117

### 설명
- 데이터에 관한 정보를 수정할 수 있습니다.
- `react-beautiful-dnd` 라이브러리를 통해 drag를 하여 상품의 순서를 수정할 수 있습니다.

<br/>
<br/>

## Excel로 데이터 변환
### video
https://github.com/bae-sh/ExcelConverter/assets/37887690/402f07e5-7990-4df6-82c2-ed5ab3f88c7f

### 설명
- 원하는 상품들의 집합을 `exceljs` 라이브러리를 통해 특정한 모양의 Excel 파일 형식으로 변환 합니다.

