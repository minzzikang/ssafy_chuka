package com.luckyseven.user.util.redis;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    @Autowired private RedisTemplate<String, Object> redisTemplate;

    @Override
    public boolean save(String id, String token, Duration duration) {
        try {
            redisTemplate.opsForValue().set(id, token, duration);

            return true;
        } catch (Exception e) {
            log.error("RedisService-save(): {}", e.getMessage());
            return false;
        }
    }

    @Override
    public boolean saveRefreshToken(String id, String token) {
        try {
            redisTemplate.opsForValue().set(id, token, Duration.ofDays(15));

            return true;
        } catch (Exception e) {
            log.error("RedisService-saveRefreshToken(): {}", e.getMessage());

            return false;
        }
    }

    @Override
    public boolean saveLogoutToken(String accessToken) {
        try {
            redisTemplate.opsForValue().set(accessToken, "logout", Duration.ofHours(1));

            return true;
        } catch (Exception e) {
            log.error("RedisService-saveLogoutToken(): {}", e.getMessage());

            return false;
        }
    }


    @Override
    public String getValues(String key) {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();

        return (String) values.get(key);
    }

    @Override
    public boolean delete(String key) {
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            log.error("RedisService-delete(): {}", e.getMessage());

            return false;
        }

        return true;
    }

    @Override
    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}