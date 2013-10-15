readme

１．セットアップ

１．１．NEX
NEX5本体に PlayMemories Camera App のリモートコントローラをインストール
※アカウントが必要: https://www.playmemoriescameraapps.com/portal/

１．２．イメージディレクトリの用意
htdocs の下に data ディレクトリを 777 で作成

１．３．hosts ファイルの編集
/etc/hosts ファイルに fabnavi.local を以下のように追加
127.0.0.1	fabnavi.local

１．４．apache VirtualHost の設定
以下のような内容で /etc/apache2/other/fabnavi.conf を作成。のち、apache を再起動。
※ご自分の環境にあわせてください。

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

１．５．キャリブレーション設定
撮影された写真の回転および切り抜きの設定は、.htaccess の以下のプロパティを編集することで変更できます。

SetEnv PHOTO_ROTATE 180.5
SetEnv PHOTO_CROP_X 200
SetEnv PHOTO_CROP_Y 100
SetEnv PHOTO_CROP_W 800
SetEnv PHOTO_CROP_H 600


１．６．操作マシンとカメラを接続
カメラのリモートコントローラを起動し、操作マシンをカメラのWIFIに接続する。




２．レコード
２．１．起動
ブラウザで http://fabnavi.local/record.php へアクセス

２．２．プロジェクトの作成
"start to record" ボタンを押す

２．３．撮影
"take a picture" ボタンを押すと、三秒後にシャッターがおります。

全てのデータは、htdocs/data ディレクトリに保存されており、現在のところデータベースなどは使わないで動作します。

