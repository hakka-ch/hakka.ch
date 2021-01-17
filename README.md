# hakka.ch

[薄荷ちゃん](https://mio3works.booth.pm/items/2215270) のファンサイト的ななにか。  
http://hakka.ch は Hugo を利用してサイトをビルドしています。

## requipments

* hugo v0.80.0


## build

```
hugo
```

生成物は `./public` へ出力されます。


## Development and Writing

### 「クローゼット」の更新
[「クローゼット」のページ](http://hakka.ch/clothet/) を更新するためには、
`/data/clothes.toml` を編集してビルドする必要があります。
フォーマットは以下の通りです。

```toml
[[カテゴリー]]
name = "服/アクセサリーのなまえ"
author = "著作者"
url = "入手できる URL"
```

カテゴリーは今のところ以下の3つを想定しています。

* cloth
    * 服に分類されるもの
* nail
    * ネイルに分類されるもの
* hair
    * 髪型に分類されるもの


### 「ギャラリー」の更新

```
hugo new --kind gallery-bundle gallery/{name}
```

`{name}` フォルダが `content/gallery/` 以下に生成されます。
このなかに画像を配置すると自動でリスト化されます。
