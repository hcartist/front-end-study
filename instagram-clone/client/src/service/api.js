// 서버 요청 라이브러리

// 서버 주소
const server = "http://localhost:3000/api"

// localStrage에 저장된 토큰을 가져오는 함수
function getBearerToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return 'Bearer ' + user.access_token; // Bearer는 로컬스토리지에 저장된 토큰을 가져오는 함수
}


/* USERS */

// 1 유저 생성 요청
export async function createUser(newUser) { // 회원가입때 필요한 함수(postman에서 했던것과 똑같음)

    // fetch(요청주소, 옵션): 클라이언트에서 서버에 요청하는 함수

    const res = await fetch(`${server}/users`, { // `${server}/users`: 옵션주소, 그 뒤: 옵션, 객체의 형태, 요청 메서드
        method: "POST", // 요청 메서드(postman에서)
        headers: { 'Content-Type': 'application/json' }, // 요청 헤더 (json포멧으로 데이터를 전송하겠다는 뜻)(토큰도 헤더에 담는다 함)
        body: JSON.stringify(newUser) // newUser: 새롭게 생성할 유저 정보, 하지만 전송하기 전에 json포멧(JSON.stringify)으로 저장한 후 정보 body에 저장하는 것, 요청 body (전송하기전에 json포멧으로 body에 저장한 모습)
    })

    if (!res.ok) { // 서버의 응답이 200(ok)가 아닌 경우
        throw new Error(`${res.status} ${res.statusText}`);
    }

    // 응답 객체를 리턴한다 (에러가 아닌 경우)
    return await res.json(); // json메서드로 서버에게 데이터를 보낸다 그후 json메서드를 자바스크립트로 변환하여 클라이언트측에서 바로 사용할 수 있게 한다(한 함수가 요청부터 데이터 변환까지 함)
}

// 2 로그인 요청 
export async function signIn(email, password) { //email, password > 파라미터
    const res = await fetch(`${server}/users/login`, {
        method: "POST", // POST: 헤더에 전송할 데이터의 포멧(Postman의 POST등등 메서드라고 보면 됌 걍 그거임)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}


/* POSTS */

// 1 피드 요청
export async function getFeed(limit, skip) { // query의 limit과 skip을 함께 전송하는 모습, limit:서버가 한번에 전송할때 보내는 도큐먼트 수 skip: 건너뛸 도큐먼트 수
    const res = await fetch(`${server}/posts/feed?limit=${limit}&skip=${skip}`, { // 전송할 query가 여러개일 경우 사이에 &를 넣는다
        headers: {
            // 메서드의 기본값: GET (메서드 부분이 생략되어 있으면 GET임)
            'Authorization': getBearerToken() // 로그인 토큰, getBearerToken(): 바로 위에서 선언한 함수, 로컬스토리지에서 토큰을 가져와서 요청 헤더에 자동적으로 담게끔하는 함수(postman에서는 일일히 토큰을 복붙해와야했었음)
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 2 게시물 한개 가져오기 요청
export async function getPost(id) {
    const res = await fetch(`${server}/posts${id}`, {
        headers: {
            'Authorization': getBearerToken()
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 3 게시물 생성 요청
export async function createPost(formData) { // formData를 인자로 받음, 파일을 전송할때 쓰는 포멧
    const res = await fetch(`${server}/posts`, {
        method: "POST",
        headers: {
            "Authorizaion": getBearerToken()
        },
        body: formData // 파일 전송 json포멧으로는 파일 전송 불가. 따라서 formData로 전송하는 것
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 4 게시물 삭제 요청
export async function deletePost(id) {
    const res = await fetch(`${server}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorizaion': getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${server} ${res.statusText}`);
    }

    return await res.json();
}

// 5 좋아요 요청
export async function likePost(id) {
    const res = await fetch(`${server}/posts/${id}/like`, {
        method: 'POST',
        headers: {
            'Authorization': getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 6 좋아요 취소 요청
export async function unlikePost(id) {
    const res = await fetch(`${server}/posts/${id}/unlike`, {
        method: 'DELETE',
        headers: {
            'Authorization': getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}


/* COMMENTS */

// 1 댓글 가져오기 요청
export async function getComments(id) {
    const res = await fetch(`${server}/posts/${id}/comments`, {
        headers: {
            'Authorizaion': getBearerToken
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 2 댓글 생성 요청
export async function createComment(id, content) {
    const res = await fetch(`${server}/posts/${id}/comments`, {
        method: "POST",
        headers: {
            "Authorizaion": getBearerToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content })
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 3 댓글 삭제 요청
export async function deleteComment(id) {
    const res = await fetch(`${server}/posts/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorizaion': getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}


/* PROFILES */

// 1 프로필 수정 요청
export async function updateProfile(editedProfile) {
    const res = await fetch(`${server}/profiles`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorizaion": getBearerToken()
        },
        body: JSON.stringify(editedProfile)
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 2 프로필 사진 수정 요청
export async function updateAvatar(formData) { // file이기 때문에 formData
    const res = await fetch(`${server}/profiles`, {
        method: "PUT",
        headers: {
            "Authorizaion": getBearerToken()
        },
        body: formData
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 3 프로필 리스트 가져오기 요청
export async function getProfiles(username) { // 검색때 사용할 예정, username 파라미터 사용
    const res = await fetch(`${server}/profiles/?username=${username}`, { // username query
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 4 프로필 상세보기 요청 
export async function getProfile(username) {
    const res = await fetch(`${server}/profiles/${username}`, { // username 파라미터
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 5 타임라인 가져오기 요청
export async function getTimeline(username) {
    const res = await fetch(`${server}/posts/?username=${username}`, { // 게시물 요청에서 username query가 있으면 타임라인, query가 없으면 전체 게시물 가져오기
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 6 팔로워 리스트 가져오기 요청
export async function getFollowers(username) {
    const res = await fetch(`${server}/profiles/?followers=${username}`, {
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 7 팔로잉 리스트 가져오기 요청
export async function getFollowingUsers(username) {
    const res = await fetch(`${server}/profiles/?following=${username}`, {
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 8 팔로우 요청
export async function follow(username) {
    const res = await fetch(`${server}/profiles/${username}/follow`, {
        method: 'POST',
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 9 언팔로우 요청
export async function unfollow(username) {
    const res = await fetch(`${server}/profiles/${username}/unfollow`, {
        method: 'DELETE',
        headers: {
            "Authorizaion": getBearerToken()
        }
    })

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}