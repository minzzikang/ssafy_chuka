package com.luckyseven.user.auth.service;

import com.luckyseven.user.auth.dto.KakaoUserDto;
import com.luckyseven.user.user.dto.UserDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.luckyseven.user.user.entity.Roles.ROLE_USER;


@SpringBootTest
@ExtendWith(SpringExtension.class)
class AuthServiceImplTest {

//    @Mock
    @Autowired
    AuthService authService;

    @Test
    void getToken() {
    }

    @Test
    void joinOrLoginForKakao() {
    }

    @Test
    void getKakaoToken() {
    }

    @Test
    void getKakaoUserInfo() {
    }

    @Test
    @DisplayName("카카오 회원가입")
    void join() {
        //
        KakaoUserDto userDto = new KakaoUserDto();
        userDto.setId(1L);
        KakaoUserDto.Properties properties = new KakaoUserDto.Properties();
        properties.setNickname("테스트_닉네임");
        userDto.setProperties(properties);

        //
        UserDto join = authService.join(userDto);

        //
        UserDto test = UserDto.of(userDto);
        test.setJoinDate(join.getJoinDate());
        test.setRole(ROLE_USER);

        Assertions.assertThat(join).isEqualTo(test);
    }

    @Test
    void issueAccessToken() {
    }

    @Test
    void testIssueAccessToken() {
    }

    @Test
    void issueRefreshToken() {
    }

    @Test
    void testIssueRefreshToken() {
    }

    @Test
    void reIssueAccessTokenWithRefreshToken() {
    }
}