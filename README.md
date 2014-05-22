#推奨バージョン
[firefox27.0](https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/27.0/)
[fullScreen addon](https://addons.mozilla.org/zh-CN/firefox/addon/fullscreen-1/?src=api)
[Camera API Addon](https://github.com/hrl7/SonyCameraRemoteControllerAddon/blob/master/addon/sonycameraremotecontroller.xpi?raw=true)


#fabnavi使用方法
設定は操作説明の下にあります。

##使い方
```fabnavi.local```にアクセスする
fabnaviはアクセスするとまずプロジェクト選択画面が表示されます。

##新しいプロジェクトをつくるとき 
左上のNewProjectをクリックする

##既存のプロジェクトに写真を追加、削除など編集するとき
プロジェクトのサムネイルをクリックし、赤く選択されたら、下のeditボタンを押す

##プロジェクトを再生するとき
プロジェクトのサムネイルをクリックし、赤く選択されたら、下のmakeボタンを押す

##プロジェクト選択後の操作方法
  * v: 詳細表示の有無
  * q: プロジェクト選択画面にもどる
  * →: 次のスライド
  * ←: 前のスライド
  * Enter: 写真撮影
  
###詳細表示について
  左上のスライダーを動かすとキャリプレーションできます。
  上からx,y,w,hになっています。調整後,右上のsave configボタンを押してください
  設定はクライアントにプロジェクトごとに保存されます。

###写真撮影について
  写真撮影は、newProjectとEditボタンを押したときはカラーの普通の写真を現在表示している写真の次に挿入します。
  サムネイルをダブルクリック、あるいはmakeボタンを押して選択した場合は
  写真の上に青で書いたものを上書きします
  写真をとった後、カメラからデータをダウンロードするためそれなりに時間を要します。fabnaviはダウンロードが終わると自動的にその写真を表示します。表示されるまでお待ちください。

###カメラごとの設定
カメラは現在NEX-5RとQX-10が使用可能です。
カメラの設定はhtdocs/api/camera.php.incの19行目を適宜コメントアウトして設定してください。


##セットアップ

1. カメラの設定
###NEX-5Rの場合
NEX5本体に PlayMemories Camera App のリモートコントローラをインストール
※アカウントが必要: https://www.playmemoriescameraapps.com/portal/
###QX-10の場合
特に必要ありません

2. イメージディレクトリの用意
htdocs の下に data ディレクトリを 777 で作成

3. hosts ファイルの編集
/etc/hosts ファイルに fabnavi.local を以下のように追加
127.0.0.1	fabnavi.local

4. apache VirtualHost の設定
以下のような内容で /etc/apache2/other/fabnavi.conf を作成。のち、apache を再起動(apachectl restart )。
※ご自分の環境にあわせてください。

```
<VirtualHost *:80>
        ServerName fabnavi.local
        ServerAdmin dadaaism@gmail.com
        ServerAlias fabnavi.local
        DocumentRoot /path/to/your/fabnavi/htdocs
        ErrorLog /var/log/apache2/fabnavi.error_log
</VirtualHost>
<Directory "/path/to/your/fabnavi/htdocs">
  Options Indexes FollowSymLinks
  AllowOverride All
  Order allow,deny
  Allow from all
</Directory>
```

5. .htaccessの設定
htdocs/.htaccessを開き、CAMERAを指定する。現段階では、QX10かNEX5Rのどちらかを選んでください

6. 操作マシンとカメラを接続
カメラのリモートコントローラを起動し、操作マシンをカメラのWIFIに接続する。