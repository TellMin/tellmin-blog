---
author: Sat Naing
pubDatetime: 2023-12-22T23:12:09+09:00
title: actix-webでBlazor WebAssemblyをホストした話
postSlug: actix-web-WebAssembly
featured: true
draft: false
tags:
  - blog
  - qiita
description: Qiitaに投稿した記事の紹介です。
---

## Table of Contents

## はじめに

Blazor WebAssemblyをactix-webでホストする方法について、という記事をQiitaに投稿しました。

[actix-webでBlazor WebAssemblyをホストする](https://qiita.com/TellMin/items/9e7f1e576a195103aa92)

ここでは記事に書かなかった補足情報を書き連ねていければと。

### Blazor WebAssemblyについて

今携わっているプロジェクトでは、Blazor WebAssemblyのホスティング モデル採用した開発を行っています。
これはどういうものかというと、バックエンドのASP.NET Core Web API とフロントエンドのBlazor WebAssemblyを同じプロジェクトに含めて開発ができるというものです。

詳しい説明は公式ドキュメントに譲るのですが、Blazor WebAssemblyをホストする際の細かなルーティングをよしなにやってくれるという良さがあります。
また、Sharedプロジェクトという共通のコンポーネントを定義するプロジェクトが作成されますので、型安全にバックエンドのAPIとの処理を記述することができます。
Client と Server がプロジェクトごと分かれるため、責務を明確に分けて開発することができるというメリットもあります。

```bash
.
├── Client
│   ├── Pages
│   │   └── Index.razor // フロントエンドのページを定義する
│   ├── Program.cs
│   └── Client.csproj
├── Server
│   ├── Controllers
│   │   └── Controller.cs // APIのエンドポイントを定義する
│   ├── Program.cs
│   └── Server.csproj
└── Shared
    ├── Components
    │   └── User.cs // APIのレスポンス型を定義すると、ClientとServerで共有できる
    └── Shared.csproj
```

とはいっても、大抵のユースケースでは Blazor Server を選択するのではないかと思っています。
Blazor WebAssemblyのビルドには時間がかかりますし、ホットリロードの効きもあまりよくありません。
（このあたりは .NET 8 で改善されているようですが）

それにjavascriptを完全に排除するものではありません。
フロントエンド開発にはjavascriptのフレームワークのほうが主流であることには変わらないでしょう。

けどやっぱりわくわくしますので、これからも情報は追いかけていきたいです。

### actix-webについて

もともと Blazor WebAssembly 何かしら面白い方法で配信したいと思っていました。
そこで白羽の矢が立ったのが、Rustで書かれたWebフレームワークの actix-web です。

というのも、ここしばらく Rust の学習を続けておりまして、何かしらのフレームワークを触ってみようと考えていました。

感触としては、とても良いです。

属性でルーティングを定義することができるというのがとてもよくて、次のように書くことができます。

```rust
#[get("/")] // ここでルーティングを定義
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}
```

ASP.NET についてもほぼ同様の記述ができるのですが、Controller や program.cs などのあちこちのファイルに分散してしまうのが難点で。。。

actix-web でばりばり開発をしていくとまた印象が変わるかもしれませんが。

このあたり、もう少し触ってみたいと思っています。

## おわりに

そういえば Rust も WebAssembly にコンパイルできるな...?

BlazorからRustの関数を呼び出してみたりしたいですね。
