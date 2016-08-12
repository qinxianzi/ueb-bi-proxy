package com.ueb.bi.proxy.init;

import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.ueb.bi.proxy.dispatcher.UebDispatchServlet;

@Configuration
@EnableWebMvc
public class DispatcherServletInit {

	@Bean(name = "uebDispatchServlet")
	public UebDispatchServlet buildDispatchServlet() {
		return new UebDispatchServlet();
	}

	@Bean
	public ServletRegistrationBean dispatcherRegistration(DispatcherServlet uebDispatchServlet) {
		ServletRegistrationBean registration = new ServletRegistrationBean(uebDispatchServlet);
		// registration.getUrlMappings().clear();
		registration.addUrlMappings("/");
		return registration;
	}
}
