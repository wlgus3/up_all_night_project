
## 📌 Overview

<br/>
심야영업 카페지도, 성장을 추구하는 사람들을 위한 노력자랑 커뮤니티 Project UpperNight입니다.

<br/>

### 🙋🏻‍♂️ 팀 구성- 개인 프로젝트

### 🖥 배포링크
https://up-all-night-project-wlgus3.vercel.app/
<br/>
## 📌 Project

### 🛠 tech stack
- 사이트 구현: **JavaScript , TypeScript, Next.js** , **MongoDB**, **AWS S3**,  KakaoMap Open API
- 데이터 핸들링: **Python**, Google Colab, Pandas, KakaoMap Open API
### 주요 기능
#### 1. 회원가입, 로그인, 깃허브 OAuth
#### 2. Python, Kakaomap Open API를 이용한 데이터 크롤링
[데이터 추출 과정 github link](https://github.com/wlgus3/Up_All_Night_Project_DataCrawling
)

#### 3. Kakaomap Open API를 이용한 지도표시 및 24시 카페 표시
  <img width="600" alt="image" src="https://github.com/wlgus3/up_all_night_project/assets/75199356/19f29b1a-76ea-4db2-b2eb-74cc6ffa5c50">

- 사용자의 현재 위치를 받아서 해당 위치를 중심으로 지도를 보여줌. 위치정보 허용 여부에 따라서 본인위치를 빨간 핀으로, 카페 위치를 파란 핀으로 표시. ( 위치정보 미허용시 홍대입구역 기준으로 표시 )
- 파란 핀 좌클릭시 매장 정보 표시, 카페 이름의 링크 클릭시 해당 카페의 상세정보를 띄운 kakao map으로 이동.
- 미흡하거나 잘못된 정보 수정요청 받기 위해서 Google form 링크로 이동되는 버튼 삽입.
  
#### 4. 오늘의 노력 게시판- 글작성 ( 에디터, 사진게시기능 ) 및 댓글작성 
#### 글 목록 페이지
<img width="600" alt="image" src="https://github.com/wlgus3/up_all_night_project/assets/75199356/75173f8c-aada-4f3e-ac7b-17497a7fb82d">

#### 글 작성 페이지
<img width="500" alt="image" src="https://github.com/wlgus3/up_all_night_project/assets/75199356/63c15a90-cb46-4fd6-b4f5-c0cc96f2a480">

  **1차 개발** - input,texterea 태그로 간단하게 구현 

  **2차 개발** - [위지위그(WYSIWYG)](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%A7%80%EC%9C%84%EA%B7%B8)구현을 위해서 [Quill Editor](https://quilljs.com/) 추가
  
  **3차 개발** -  AWS S3 & aws-sdk 패키지 사용한 이미지 게시 기능 추가 
  


<br/>
