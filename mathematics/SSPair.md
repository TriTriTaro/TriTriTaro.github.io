# 強亜ペア数列(クローズド β テストだよ)

工事中だよ。

## コンセプト

1. 亜原始数列のペア数列を作りたい。(2 行目だけペア数列にすると、弱亜ペアになる)
1. 以前は、$(0,0)(1,1)$の展開を$(0,0)(1,0)(3,0)(6,0)(10,0)\cdots$と目論んでいた。
1. 最近、ペア数列の極限$(0,0)(1,1)(2,2)(3,3)\cdots$を$(0,0)(2,0)$に圧縮する方が、  
   辞書式順序的には綺麗ではないかと思った。

$(0,0)(a+1,0) \mapsto (0,0)(a,a)(2a,2a)(3a,3a)\cdots$

$(0,0)(a,b+1)\mapsto (0,0)(a,b)(2a,2b)(3a,3b)\cdots$

1 行目の数字が、2 行目の数字を増やしていいのか？→ わかりません

無限ループありそう → 僕もそう思う。見つけてくれたら、喜ぶ。

上昇判定は本家と同じで、シンプルにしたい。ワンアイデアで遊べるのが数列表記の良いところ。

## 強さ

わかりません

## 圧縮された定義

$$
\begin{align*}
\text{SSPair}(n) &= \text{expand}((0,0)(1,\omega)(1,1)[n]) \cr
\text{expand}([n]) &= [n]\cr
\text{expand}(S[n]) &= \begin{cases}
\text{expand}(G[10^n]) &(\text{if } S_{X1} = S_{X2} = 0) \cr
\text{expand}(G(S_{X1},n)[10^n]) &(\text{if } S_{X2}  = \omega) \cr
\text{expand}(GB^{(1)}B^{(2)}\cdots B^{(n)}[10^n]) &(\text{otherwise}) \cr
\end{cases}\cr
S &= S_1S_2\cdots S_X\cr
G &= S_1S_2\cdots S_{X-1}\cr
B^{(m)} &= B_r^{(m)}B_{r+1}^{(m)}\cdots B_X^{(m)}\cr
B_x^{(m)} &= (S_{x1} + m A_{x1} \Delta_1,S_{x2} + m A_{x2} \Delta_2)\cr
S_x &= (S_{x1},S_{x2})\cr
A_{xy} &= \begin{cases}
1 &(\text{if } \exists a. r = p_y^a(x))\cr
0 &(\text{otherwise})\cr
\end{cases}\cr
\Delta_1 &= \begin{cases}
S_{X1} - S_{r1} - 1 &(\text{if } S_{x2} = 0)\cr
S_{X1} - S_{r1} &(\text{if } S_{x2} \neq 0)\cr
\end{cases}\cr
\Delta_2 &= \begin{cases}
S_{X1} - S_{r1} - 1 &(\text{if } S_{x2} = 0)\cr
S_{X2} - S_{r2} &(\text{if } S_{x2} \neq 0)\cr
\end{cases}\cr
r &= \begin{cases}
p_1(X) &(\text{if } S_{x2} = 0)\cr
p_2(X) &(\text{if } S_{x2} \neq 0)\cr
\end{cases}\cr
p_1(x) &= \max(\set{i \mid i < x \land S_{i1} < S_{x1} } \cup \set{0})\cr
p_2(x) &= \max(\set{i \mid \exists a. i = p_1^a(x) \land S_{i2} < S_{x2} } \cup \set{0})\cr
\end{align*}
$$

## 圧縮定義の詳細

| ラベル   | 変数名          | 型                          |
| -------- | --------------- | --------------------------- |
| 極限関数 | $\text{SSPair}$ | $\mathbb{N} \to \mathbb{N}$ |
| 極限関数 | $\text{SSPair}$ | $\mathbb{N} \to \mathbb{N}$ |
| 極限関数 | $\text{SSPair}$ | $\mathbb{N} \to \mathbb{N}$ |

## プログラム定義

p5.js でヒドラ描画と一緒に作ろうと思ってます。やる気はある。
