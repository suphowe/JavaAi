package com.xiaohao.ui;/**
 * Created with IntelliJ IDEA.
 *
 * @author 小浩
 * @date 2019-01-16 15:42
 * @package com.xiaohao.ui
 * @description
 */

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws IOException {
        Parent root = FXMLLoader.load(getClass().getResource("/app.fxml"));
        primaryStage.setTitle("图像文字识别");
        primaryStage.setScene(new Scene(root));
        primaryStage.show();
    }
}
