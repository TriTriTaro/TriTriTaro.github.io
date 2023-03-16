# 蜜柑チェーン表記

## 概要

コンウェイのチェーン表記とクヌースの矢印を合体させたものです。

蜜柑と自然数を挟むと数を出力することができます。下は展開例。

$$3\circlearrowleft 4 = 81$$

$$3\circlearrowleft^2 3 = 3\circlearrowleft 3\circlearrowleft 3\circlearrowleft 3 \gt \text{Graham's number}$$

2022/2/20に即席巨大数2に投稿した表記で2位を取りました。

## 蜜柑

文字$\circlearrowleft$を整正数個並べたものを蜜柑といいます。

並べた個数は上付き文字で表現できます。

$$\circlearrowleft^n = \underbrace{\circlearrowleft\circlearrowleft\cdots\circlearrowleft}_n$$

$\circlearrowleft^1$は単に$\circlearrowleft$と記します。

## 展開規則

$a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_n} a_{n+1}$を展開します。

条件は上から優先されます。

### $n=1\land b_n = 1$の場合

$$a_1\circlearrowleft a_2 = a_1^{a_2}$$

### $\exist. m \gt 1.a_m = 0$の場合

$m = \min\{i \mid a_i = 1 \land i \gt 1\}$とし、

$$a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_n} a_{n+1} = a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_m} a_{m-1}$$

### $n\gt2\land b_n = 1$の場合

$$a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_n} a_{n+1} = a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} (a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots( a_{n}-1) \circlearrowleft^{b_n} a_{n+1}) \circlearrowleft^{b_m} (a_{m-1}-1)$$

### $n\gt2\land b_n \gt 1$の場合

$$a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_n} a_{n+1} = a_1 \circlearrowleft^{b_1}a_2 \circlearrowleft^{b_2} \cdots a_{n} \circlearrowleft^{b_n-1} a_{n} \circlearrowleft^{b_n} (a_{n+1}-1) $$
