package com.xiaohao.service;
import com.baidu.aip.ocr.AipOcr;
/**
 * Created with IntelliJ IDEA.
 *
 * @author 小浩
 * @date 2018-12-24 15:42
 * @package com.xiaohao
 * @description
 */
public class Ocr {
    public static final String APP_ID = "15248983";
    public static final String API_KEY = "h47LbxW7C6PoN1WWjLZjuNrS";
    public static final String SECRET_KEY = "7gS2XworKfwjgpdxTLMxsgY8RqtWtfhV";
    private static AipOcr client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
    static {
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
    }

    public static AipOcr getAipOcr(){
        return client;
    }
}
