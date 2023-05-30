# 뉴스 검색 서비스를 제공하는 프로젝트입니다.

## 사용방법

<br />

해당 프로젝트는 newscatcher(https://newscatcherapi.com/) API를 사용하고 있습니다. 그렇기 때문에 해당 API 키가 필요합니다. 폴더 최상단에 .env 파일을 생성한 후, 다음과 같이 정의해야 합니다.

<br />

```
VITE_APP_HEADLINES_URL='https://api.newscatcherapi.com/v2/latest_headlines'
VITE_APP_API_KEY= API 키
VITE_APP_NEWS_URL='https://api.newscatcherapi.com/v2/search'
```

### Install Dependencies

```
yarn
(or)
yarn install
```

<br />

### Use it

```
yarn dev
```
