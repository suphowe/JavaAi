package com.xiaohao.ui;

import com.baidu.aip.ocr.AipOcr;
import com.xiaohao.service.Ocr;
import javafx.concurrent.Task;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.input.MouseEvent;
import javafx.stage.FileChooser;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.ResourceBundle;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created with IntelliJ IDEA.
 *
 * @author 小浩
 * @date 2019-01-16 15:58
 * @package com.xiaohao.ui
 * @description
 */
public class Controller implements Initializable {
    @FXML
    private Button button;

    @FXML
    private TextArea textArea;

    private AipOcr client = Ocr.getAipOcr();
    private final static FileChooser FILE_CHOOSER = new FileChooser();
    private final static HashMap<String, String> OPTIONS = new HashMap<String, String>();

    private final static ExecutorService EXECUTOR = Executors.newSingleThreadExecutor();


    static {
        OPTIONS.put("detect_direction", "true");
        OPTIONS.put("probability", "true");
        FILE_CHOOSER.getExtensionFilters().addAll(
                new FileChooser.ExtensionFilter("JPG", "*.jpg"),
                new FileChooser.ExtensionFilter("PNG", "*.png")
        );


    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        textArea.setWrapText(true);
        button.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {
                final File file = FILE_CHOOSER.showOpenDialog(button.getScene().getWindow());
                if (file == null) {
                    return;

                }
                EXECUTOR.submit(new Task<Void>() {
                    private String str = "";

                    @Override
                    protected Void call() {
                        textArea.clear();
                        str = startWork(file.getAbsolutePath());
                        return null;
                    }

                    @Override
                    protected void succeeded() {
                        textArea.setText(str);
                    }
                });
                Alert alert = new Alert(Alert.AlertType.INFORMATION, "加载中...");
                alert.initOwner(button.getScene().getWindow());
                alert.setHeaderText(null);
                alert.showAndWait();
            }
        });
    }

    private String startWork(String filePath) {
        JSONObject res = client.basicAccurateGeneral(filePath, OPTIONS);
        JSONArray words_result = res.getJSONArray("words_result");
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < words_result.length(); i++) {
            Object o = words_result.getJSONObject(i);
            stringBuilder.append(((JSONObject) o).getString("words"));
        }
        return stringBuilder.toString();
    }
}
