package com.photory.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // 画像は認可付きのImageController(/api/images/{id})経由で配信するため、
    // 静的リソースマッピングは設定しない
}