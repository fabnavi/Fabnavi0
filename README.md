readme

環境
・PHP の動作する Apache Web Server
・


##操作方法(テンキー)
###record.php
  * 5: シャッターを切る
  * 8: サムネイルの表示/非表示
  * 9: 最後に撮った写真をplay.phpで表示する

###play.php
  * 1: 前へ
  * 3: 次へ
  * 8: 更新
  * 9: 現在開いているページを閉じる

  撮影中に9を押すことで、撮影したものを確認でき、再度9を押すと撮影画面に戻ることができます。



##セットアップ

1. NEX
NEX5本体に PlayMemories Camera App のリモートコントローラをインストール
※アカウントが必要: https://www.playmemoriescameraapps.com/portal/

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
        DocumentRoot /Users/dadaa/WORKS/mozilla/projects/fabnavi/repositories/fabnavi/htdocs
        ErrorLog /var/log/apache2/fabnavi.error_log
</VirtualHost>
<Directory "/Users/dadaa/WORKS/mozilla/projects/fabnavi/repositories/fabnavi/htdocs">
  Options Indexes FollowSymLinks
  AllowOverride All
  Order allow,deny
  Allow from all
</Directory>
```

5. キャリブレーション設定
撮影された写真の回転および切り抜きの設定は、.htaccess の以下のプロパティを編集することで変更できます。

```
SetEnv PHOTO_ROTATE 180.5
SetEnv PHOTO_CROP_X 200
SetEnv PHOTO_CROP_Y 100
SetEnv PHOTO_CROP_W 800
SetEnv PHOTO_CROP_H 600
```

6. 操作マシンとカメラを接続
カメラのリモートコントローラを起動し、操作マシンをカメラのWIFIに接続する。




##レコード
1. 起動
ブラウザで http://fabnavi.local/record.php へアクセス

2. プロジェクトの作成
"start to record" ボタン、あるいはテンキーの"5"を押す

3. 撮影
テンキーの"5" ボタンを押すと、三秒後にシャッターがおります。

4. 確認
テンキーの"8"を押すとサムネイルを確認することができます。
また、テンキーの"9"を押すと最後に撮った写真をPlay.phpで表示し、確認することができます。
そこで再度テンキーの"9"を押すとPlay.phpを閉じて撮影に戻ることが出来ます。

全てのデータは、htdocs/data ディレクトリに保存されており、現在のところデータベースなどは使わないで動作します。

##プレイ
1. プロジェクト一覧の表示
ブラウザで http://fabnavi.local/play.php へアクセス

2. プロジェクトの選択
写真の一覧からプロジェクトをクリック

3. プレイ
→：次へ
←：前へ
ESC：一覧へ


