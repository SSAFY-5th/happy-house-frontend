# 해피하우스 FE

> SSAFY 해피하우스 UI 중간 발표: 강윤정, 이용재

## Summary

현재까지 해피하우스 서버 및 클라이언트 개발 사항에 대해서 공유합니다.

## 해피하우스 FE

클라이언트의 경우 포트폴리오로써 가치있도록 [2020 Dev-Matching: FE](https://programmers.co.kr/skill_check_assignments/4) 요구사항을 반영하여 해피하우스 클라이언트 코드를 개선하였습니다.

<details>
<summary>요구사항은 아래와 같습니다.</summary>
<div markdown="1">


### 과제 설명

- 화면을 구성하는 요소를 컴포넌트로 만들어서 코딩합니다.
  - 컴포넌트는 function 문법, class 문법 어느 쪽을 사용해도 괜찮습니다.
  - 각 컴포넌트는 각각의 상태 값을 가지고 있고, render 함수를 통해 현재 상태를 렌더링 합니다.
  - render 함수는 파라미터를 넘겨받는 것 없이 해당 컴포넌트의 상태 변수들만 갖고 렌더링이 일어나도록 설계해야 합니다.
  - DOM 접근은 최소화해야 합니다.
  - 컴포넌트 간의 결합은 최대한 느슨해야 합니다.
- 과제는 chrome, edge, firefox, safari 등 모던 브라우저 최신 버전에서 동작하는 것을 원칙으로 합니다.

### 수행 기술

- JavaScript(ES6+)
- 설치되어있는 모듈(node_modules) 외에 다른 외부 라이브러리는 사용하지 않도록 합니다. 예를 들어 jQuery, Webpack, Lodash, Axios, Angular, React, Vue, Immutable-js, Ramda 등을 사용할 수 없습니다.

#### 요구사항

**중요** 말머리로 `[필수]` 가 붙은 요구사항은 반드시 수행해주세요.

#### 검색어 추천

- **[필수]** 추천 검색어 API를 이용해 입력란에 추천 검색어를 보여주세요. 추천 검색어는 엔터를 치는 등 별도의 행위가 없을 때에도 자동으로 보여야 합니다.
  - `keywords`라는 class 명으로 스타일링 되어있습니다. 자세한 내용은 index.html과 style.css를 참고하시리 바랍니다.
  - API에 대한 설명은 하단에 있습니다.
  - API에서 에러가 나거나, 추천 검색어가 없는 경우에도 검색 기능을 사용하는 데에는 문제가 없어야 합니다.

#### 검색어 추천 - 사용성 개선

- 키보드와 마우스를 이용해서 추천 검색어를 선택할 수 있게 만들어 주세요.
  1. esc를 누르면 추천 검색어 창이 닫힙니다.
  2. 키보드의 위, 아래 키를 누르면 추천 검색어 하이라이트가 옮겨지고 엔터를 누르면 하이라이트가 위치한 검색어가 입력창에 반영되고 사진이 검색됩니다.
  3. 마우스로 다른 곳을 클릭하여 input이 focus를 잃어버리는 경우 추천 검색어 창이 닫힙니다.
  4. 마우스로 추천 검색어를 누르면 커서가 위치한 검색어가 입력창에 반영되며 사진이 검색됩니다.
- 추천 검색어가 로딩되는 중임을 알리는 UI적 처리를 해주세요.

#### 검색

- **[필수]** 검색 시 API로 받은 고양이 사진이 화면에 렌더 되어야 합니다.

#### 검색 - 사용성 개선

- 검색 중 에러가 발생한 경우, 에러가 발생했다는 것을 알리는 UI적 처리를 해주세요.
- 검색 결과가 로딩되는 중임을 알리는 UI적 처리를 해주세요.
- 페이지 url에 검색어가 존재하는 경우 페이지에 진입하자마자 해당 검색어로 검색된 결과가 나오도록 합니다.

#### 퍼포먼스 향상

- 검색어별 추천 검색어를 로컬에 캐싱해서 사용하도록 합니다.
- 추천 검색어 API 호출 중 새로운 검색어 입력이 감지되면 기존의 ajax 요청을 취소하고 새로운 검색어를 기준으로 API 요청을 보내주세요.
- Debounce를 구현합니다. 이를 통해 검색어가 입력될 때마다 서버에 요청이 일어나지 않게 합니다.
- 키워드별 검색 결과를 캐싱하여 사용합니다. 단, 캐싱된 데이터는 브라우저를 닫으면 사라져야 합니다.

#### 코드 구조 관련

- 각 컴포넌트 간의 연동은 가급적 직접 호출하지 말고, App 컴포넌트를 만든 뒤 이 컴포넌트가 콜백 함수를 이용해 조율하는 형태로 만듭니다.
- ES6 module 형태로 코드를 변경합니다.
  - `webpack` , `parcel` 과 같은 번들러를 사용하지 말아 주세요.
  - 해당 코드 실행을 위해서는 `http-server` 모듈을(로컬 서버를 띄우는 다른 모듈도 사용 가능) 통해 `index.html` 을 띄워야 합니다.
  - 터미널에서 `npm start` 명령어를 이용해 로컬 서버를 띄운 후 작업을 합니다.
- API fetch 코드를 `async` , `await` 문을 이용하여 수정해주세요. 해당 코드들은 에러가 났을 경우를 대비해서 적절히 처리가 되어있어야 합니다.
  - 에러 발생을 알리는 UI적 처리까지 하면 더욱 좋습니다.
  - 서버에서는 아주 가끔 데이터 모양이 이상하게 내려오기도 합니다. 이를 대응해주세요.
- API의 status code에 따라 에러 메시지를 분리하여 작성해야 합니다.
- 컴포넌트 내부의 함수들이나 Util 함수들을 작게 잘 나누어주세요.

</div>
</details>

### 결과물
https://user-images.githubusercontent.com/16266103/115386196-0ca33400-a214-11eb-8240-c327f758ef1d.mov


## 해피하우스 BE
### API 정리

기존 클라이언트가 JSP 기반으로 되어있기 때문에 자체적으로 query param을 생성하여 요청하는 url을 정리하였습니다. 회원가입, 로그인 등의 상황에서는 백엔드에 REST API가 도입되는 시점에 가능하게 될 것 같습니다. (리팩토링 하기 전 JSP 기반의 클라이언트에서는 회원가입 및 로그인이 가능합니다)

#### 1. 시 조회

##### URL

`GET http://localhost:8080/hh/map?act=sido`

##### Response

```json
[
    {
        "sido_code": "11",
        "sido_name": "서울특별시"
    },
    {
        "sido_code": "26",
        "sido_name": "부산광역시"
    },
    ...
]
```

#### 2. 시에따른 구 조회

##### URL

`GET http://localhost:8080/hh/map?act=gugun&sido=${sido}`

##### Parameter

- sido: 시 코드

##### Response

```json
[
    {
        "gugun_name": "종로구",
        "gugun_code": "11110"
    },
    {
        "gugun_name": "중구",
        "gugun_code": "11140"
    },
    ...
]
```

#### 3. 구에따른 동 조회

##### URL

`GET http://localhost:8080/hh/map?act=dong&gugun=${gugun}`

##### Parameter

- gugun: 구 코드

##### Response

```json
[
    {
        "code": "11170",
        "dong": "갈월동"
    },
    {
        "code": "11170",
        "dong": "도원동"
    },
    ...
]
```

#### 4. 동별 아파트 조회

##### URL

`GET http://localhost:8080/hh/map?act=apt&dong=${dong}`

##### Parameter

- dong: 동 이름

##### Response

```json
[
    {
        "no": "236",
        "aptName": "동자",
        "code": "11170",
        "lng": "126.9750291",
        "jibun": "19-8",
        "dong": "동자동",
        "lat": "37.5511054"
    },
    {
        "no": "172",
        "aptName": "센트레빌아스테리움서울",
        "code": "11170",
        "lng": "126.9733793",
        "jibun": "45",
        "dong": "동자동",
        "lat": "37.5494341"
    }
    ...
]
```

#### 5. Database 설계
```sql
create database happyhouse;
use happyhouse;

create table users(
id varchar(20) primary key,
pwd varchar(20) not null,                   
name varchar(16) not null,
addr varchar(50),
phone varchar(15),
email varchar(50)
);

insert into users(id, pwd, name, addr, phone, email) 
	values('ssafy', '1234', '김싸피', '서울시 동작구', '010-1234-5677', 'ssafy@naver.com');
select * from users;
```

#### 6. 회원가입

##### URL
`POST http://localhost:8080/hh/register.jsp`

##### Parameter

- id: 아이디
- pwd: 비밀번호
- name: 이름
- addr: 주소
- phone: 전화번호
- email: 이메일

##### Response
```java
@Override
	public void register(UserDto userDto) throws SQLException {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = DBUtil.getConnection();
			StringBuilder insertMember = new StringBuilder();
			insertMember.append("insert into users");
			insertMember.append(" values(?, ?, ?, ?, ?, ?)");
			pstmt = conn.prepareStatement(insertMember.toString());
			pstmt.setString(1, userDto.getId());
			pstmt.setString(2, userDto.getPwd());
			pstmt.setString(3, userDto.getName());
			pstmt.setString(4, userDto.getAddr());
			pstmt.setString(5, userDto.getPhone());
			pstmt.setString(6, userDto.getEmail());
			pstmt.executeUpdate();
		} finally {
			DBUtil.close(pstmt, conn);
		}
	}
  ```

#### 7. 로그인
##### URL
`POST http://localhost:8080/hh/index.jsp`

##### Parameter

- id: 아이디
- pwd: 비밀번호

##### Response
```java
@Override
	public UserDto login(String id, String pwd) throws SQLException {
		UserDto userDto = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DBUtil.getConnection();
			StringBuilder sql = new StringBuilder();
			sql.append("select * from users");
			sql.append(" where id = ? and pwd = ?");
			pstmt = conn.prepareStatement(sql.toString());
			pstmt.setString(1, id);
			pstmt.setString(2, pwd);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				userDto = new UserDto();
				userDto.setId(rs.getString("id"));
				userDto.setPwd(rs.getString("pwd"));
				userDto.setName(rs.getString("name"));
				userDto.setAddr(rs.getString("addr"));
				userDto.setPhone(rs.getString("phone"));
				userDto.setEmail(rs.getString("email"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			userDto = null;
		} finally {
			DBUtil.close(rs, pstmt, conn);
		}
		return userDto;
	}
```
#### 8. 마이페이지
- javax.servlet.jsp.PageContext 클래스를 상속해 웹 컨테이너가 JSP 실행시 자동으로 생성해서 제공하는 내장 객체를 사용해서 구현

```jsp
<c:set var="root" value="${pageContext.request.contextPath}" />
```

```jsp
<h2 class="title">회원 정보 확인</h2>
<form action="#" class="form-horizontal" id="form">
	<div class="form-group has-feedback row">
		<label for="inputName" class="col-md-3 control-label text-md-right col-form-label">아이디<span class="text-danger small">*</span> </label>
		<div class="col-md-8">${userinfo.id}</div>
	</div>
	<div class="form-group has-feedback row">
		<label for="inputLastName" class="col-md-3 control-label text-md-right col-form-label">비밀번호<span class="text-danger small">*</span> </label>
		<div class="col-md-8">${userinfo.pwd}</div>
	</div>
	<div class="form-group has-feedback row">
		<label for="inputUserName" class="col-md-3 control-label text-md-right col-form-label">이름<span class="text-danger small">*</span> </label>
		<div class="col-md-8">${userinfo.name}</div>
	</div>
	<div class="form-group has-feedback row">
		<label for="inputEmail" class="col-md-3 control-label text-md-right col-form-label">주소<span class="text-danger small">*</span> </label>
		<div class="col-md-8">${userinfo.addr}</div>
	</div>
	<div class="form-group has-feedback row">
		<label for="inputPassword" class="col-md-3 control-label text-md-right col-form-label">전화번호<span class="text-danger small">*</span> </label>
		<div class="col-md-8">${userinfo.phone}</div>
	</div>
</from>
```
 
#### 9. 추가되어야 할 Endpoint

- WIP


