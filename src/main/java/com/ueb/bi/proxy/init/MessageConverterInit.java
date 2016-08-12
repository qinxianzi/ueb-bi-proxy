package com.ueb.bi.proxy.init;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.ueb.bi.proxy.constants.UebConstants;

@Configuration
public class MessageConverterInit extends WebMvcConfigurerAdapter {

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		super.configureMessageConverters(converters);
		StringHttpMessageConverter msgConverter = new StringHttpMessageConverter(UebConstants.UTF8);
		converters.add(msgConverter);
	}
}
