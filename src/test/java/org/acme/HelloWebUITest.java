package org.acme;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;
import io.quarkiverse.quinoa.testing.QuarkusPlaywrightManager;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.TestProfile;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.net.URL;

@QuarkusTest
@TestProfile(QuinoaTestProfiles.Enable.class)
@QuarkusTestResource(QuarkusPlaywrightManager.class)
public class HelloWebUITest {

    @QuarkusPlaywrightManager.InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL url;

    @Test
    void name() {
        final Page page = context.newPage();
        Response response = page.navigate(url.toString());
        Assertions.assertEquals("OK", response.statusText());

        page.waitForLoadState();

        String title = page.title();
        Assertions.assertEquals("Quinoa Demo", title);

        // Make sure the app content is ok
        String greeting = page.innerText("h1");
        Assertions.assertEquals("Hello Quinoa", greeting);
    }

}