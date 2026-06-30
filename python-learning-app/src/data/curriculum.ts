export interface Problem {
  id: string;
  question: string;
  hints: string[];
  answer: string;
  explanation: string;
}

export interface Comparison {
  title?: string;
  java: string;
  python: string;
}

export interface LessonSection {
  title: string;
  points: string[];
  comparisons: Comparison[];
}

export interface DayData {
  day: number;
  week: number;
  title: string;
  description: string;
  lessons: LessonSection[];
  problems: Problem[];
  summary: string[];
}

export const curriculum: DayData[] = [
  // ============================================================
  // Week 1: 基礎文法
  // ============================================================
  {
    day: 1,
    week: 1,
    title: '変数・型・出力',
    description: '型宣言不要の世界へ。f-string、type()、動的型付けを学びます。',
    lessons: [
      {
        title: '変数宣言と型',
        points: [
          'Pythonでは型宣言が不要。代入するだけで変数が作られます',
          'type() で実行時に型を確認できます（Javaのinstanceofに近い）',
          '動的型付け: 同じ変数に異なる型の値を再代入可能',
          '型ヒント（Type Hints）を使えばIDEの補完が効きます',
        ],
        comparisons: [
          {
            title: '変数宣言の比較',
            java: `// Java: 型を明示的に宣言
String name = "田中";
int age = 30;
double height = 165.5;
boolean isActive = true;`,
            python: `# Python: 型宣言不要
name = "田中"
age = 30
height = 165.5
is_active = True  # bool型は大文字始まり`,
          },
          {
            title: '出力の比較',
            java: `// Java
System.out.println("名前: " + name);
System.out.println(String.format("年齢: %d歳", age));`,
            python: `# Python: f-string が便利
print(f"名前: {name}")
print(f"年齢: {age}歳")
print(f"計算もできる: {age * 2}")`,
          },
        ],
      },
      {
        title: '型変換とNone',
        points: [
          'int(), float(), str() で型変換（JavaのInteger.parseIntに相当）',
          'Javaのnull → PythonではNone',
          'None判定は is None を使う（== ではなく）',
        ],
        comparisons: [
          {
            title: '型変換',
            java: `// Java
int num = Integer.parseInt("42");
String s = String.valueOf(100);
double d = (double) num;`,
            python: `# Python
num = int("42")
s = str(100)
d = float(num)
print(type(num))  # <class 'int'>`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '自分の名前、年齢、趣味を変数に格納し、f-stringを使って「私は{名前}です。{年齢}歳で、趣味は{趣味}です。」と出力してください。さらにtype()を使って各変数の型も出力してください。',
        hints: [
          'f-string は f"..." の形式で書きます',
          'type(変数名) で型を調べられます',
        ],
        answer: `name = "田中花子"
age = 30
hobby = "読書"

print(f"私は{name}です。{age}歳で、趣味は{hobby}です。")
print(f"name: {type(name)}, age: {type(age)}, hobby: {type(hobby)}")`,
        explanation: 'f-stringでは{}内にそのまま変数や式を書けます。type()はJavaのgetClass()に相当します。',
      },
      {
        id: 'q2',
        question: '文字列 "123.45" を受け取り、(1)整数部分だけを取り出してint型に変換、(2)float型に変換してそれぞれ出力してください。直接int("123.45")とするとエラーになることに注意。',
        hints: [
          'まずfloat()に変換してからint()に変換する方法があります',
          'int()は小数点を含む文字列を直接変換できません',
        ],
        answer: `s = "123.45"
f = float(s)
i = int(f)
print(f"float: {f}")  # 123.45
print(f"int: {i}")    # 123`,
        explanation: 'int("123.45")はValueErrorになります。float()を経由してからint()に変換します。int()は小数点以下を切り捨てます。',
      },
      {
        id: 'q3',
        question: '変数a=10, b=20の値を、第3の変数を使わずに入れ替えてください。Javaではtempが必要ですが、Pythonには便利な方法があります。',
        hints: [
          'Pythonではタプルのアンパックという機能があります',
          'a, b = b, a と書けます',
        ],
        answer: `a = 10
b = 20
print(f"交換前: a={a}, b={b}")

a, b = b, a
print(f"交換後: a={a}, b={b}")`,
        explanation: 'Pythonではa, b = b, a で同時代入が可能です。内部的にはタプル(b, a)を作ってアンパックしています。Javaのようなtemp変数は不要です。',
      },
      {
        id: 'q4',
        question: 'ユーザーの情報（名前:str, 年齢:int, 身長:float, 会員:bool）を変数に格納し、全変数をf-stringで1行にまとめて出力してください。boolの値はTrueの場合「会員」、Falseの場合「非会員」と表示すること。',
        hints: [
          'Pythonの三項演算子は「値A if 条件 else 値B」の形式です',
          'f-string内でif-elseも書けます',
        ],
        answer: `name = "田中花子"
age = 30
height = 165.5
is_member = True

status = "会員" if is_member else "非会員"
print(f"{name}さん ({age}歳, {height}cm) - {status}")`,
        explanation: 'Pythonの三項演算子は「x if 条件 else y」でJavaの「条件 ? x : y」に対応します。f-string内でも使えます。',
      },
    ],
    summary: [
      'Pythonは型宣言不要 → 変数名 = 値 で宣言',
      'f-string: f"...{変数}..." でJavaのString.formatより簡潔',
      'type(): 実行時の型確認（JavaのgetClass()相当）',
      'None: Javaのnullに対応、判定は is None を使う',
      '三項演算子: x if 条件 else y（Javaの 条件 ? x : y）',
      '多重代入: a, b = b, a でスワップ可能',
    ],
  },
  {
    day: 2,
    week: 1,
    title: 'リスト・辞書・タプル',
    description: 'ArrayList→list、HashMap→dict。Pythonのコレクション型を学びます。',
    lessons: [
      {
        title: 'リスト（list）',
        points: [
          'JavaのArrayList → Pythonのlist。[]で作成し、型混在OK',
          'append(), insert(), remove(), pop() などのメソッドが使える',
          'スライス: list[start:end:step] で部分リストを取得',
          'リスト内包表記: [式 for x in リスト] で変換・フィルタを1行で',
        ],
        comparisons: [
          {
            title: 'リスト操作',
            java: `// Java
List<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");
fruits.get(0);  // "apple"
fruits.size();  // 3`,
            python: `# Python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits[0]      # "apple"
len(fruits)    # 4
fruits[-1]     # "date" (末尾)`,
          },
          {
            title: 'スライスとリスト内包表記',
            java: `// Java: subList + Stream API
List<String> sub = fruits.subList(1, 3);
List<String> upper = fruits.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`,
            python: `# Python: スライス + 内包表記
sub = fruits[1:3]   # ["banana", "cherry"]
upper = [f.upper() for f in fruits]
# フィルタ付き
long_fruits = [f for f in fruits if len(f) > 5]`,
          },
        ],
      },
      {
        title: '辞書（dict）とタプル（tuple）',
        points: [
          'JavaのHashMap → Pythonのdict。{key: value}で作成',
          '.keys(), .values(), .items() でキー/値/ペアを取得',
          '.get(key, default) でKeyError回避（JavaのgetOrDefault相当）',
          'タプルは () で作成。不変（イミュータブル）なリスト',
        ],
        comparisons: [
          {
            title: '辞書操作',
            java: `// Java
Map<String, Object> user = new HashMap<>();
user.put("name", "田中");
user.put("age", 30);
user.get("name");
user.getOrDefault("email", "未設定");`,
            python: `# Python
user = {"name": "田中", "age": 30}
user["name"]              # "田中"
user.get("email", "未設定")  # "未設定"
user["email"] = "test@example.com"  # 追加

# 辞書内包表記
squares = {x: x**2 for x in range(5)}`,
          },
          {
            title: 'タプル',
            java: `// Java: 不変リストに近い概念
List<String> pair = List.of("x", "y");
// pair.add("z");  // UnsupportedOperationException`,
            python: `# Python: タプルは変更不可
point = (10, 20)
x, y = point  # アンパック
# point[0] = 30  # TypeError!

# 関数の複数戻り値にも使える
def get_name_age():
    return "田中", 30
name, age = get_name_age()`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '1から20までの数値リストを作成し、リスト内包表記を使って偶数だけを取り出した新しいリストを作成してください。さらにその偶数リストの合計と平均を出力してください。',
        hints: [
          'range(1, 21) で1から20のrangeオブジェクトが作れます',
          'リスト内包表記のフィルタ: [x for x in リスト if 条件]',
          'sum() と len() を使って合計と平均を計算',
        ],
        answer: `numbers = list(range(1, 21))
evens = [n for n in numbers if n % 2 == 0]
total = sum(evens)
avg = total / len(evens)
print(f"偶数: {evens}")
print(f"合計: {total}, 平均: {avg}")`,
        explanation: 'リスト内包表記は [式 for 変数 in イテラブル if 条件] の形で、フィルタと変換を同時にできます。sum()は合計を計算する組み込み関数です。',
      },
      {
        id: 'q2',
        question: '以下の商品データ（辞書のリスト）から、価格が1000円以上の商品名だけをリスト内包表記で取り出してください。\nproducts = [{"name": "ノート", "price": 200}, {"name": "ペン", "price": 150}, {"name": "バッグ", "price": 3000}, {"name": "本", "price": 1500}]',
        hints: [
          '辞書のリストから条件付きで要素を取り出すには内包表記が使えます',
          'p["price"] >= 1000 でフィルタリング',
        ],
        answer: `products = [
    {"name": "ノート", "price": 200},
    {"name": "ペン", "price": 150},
    {"name": "バッグ", "price": 3000},
    {"name": "本", "price": 1500}
]
expensive = [p["name"] for p in products if p["price"] >= 1000]
print(expensive)  # ['バッグ', '本']`,
        explanation: 'リスト内包表記で辞書のリストをフィルタリングし、特定のキーの値だけを取り出すパターンはデータ処理で頻出します。',
      },
      {
        id: 'q3',
        question: '2つのリスト keys = ["name", "age", "city"] と values = ["田中", 30, "東京"] から辞書を作成してください。zip() を使う方法と辞書内包表記を使う方法の2通りで書いてみましょう。',
        hints: [
          'zip(keys, values) で2つのリストをペアにできます',
          'dict(zip(keys, values)) で一発変換できます',
          '辞書内包表記: {k: v for k, v in zip(keys, values)}',
        ],
        answer: `keys = ["name", "age", "city"]
values = ["田中", 30, "東京"]

# 方法1: dict() + zip()
d1 = dict(zip(keys, values))

# 方法2: 辞書内包表記
d2 = {k: v for k, v in zip(keys, values)}

print(d1)  # {'name': '田中', 'age': 30, 'city': '東京'}`,
        explanation: 'zip()は複数のイテラブルをまとめてタプルのイテレータを返します。dict()のコンストラクタはキー・値のペアから辞書を作れます。',
      },
      {
        id: 'q4',
        question: 'スライスを使って、リスト [1,2,3,4,5,6,7,8,9,10] から (1)先頭3つ (2)末尾3つ (3)偶数番目のインデックスの要素 (4)逆順のリスト を取り出してください。',
        hints: [
          'スライスの基本: list[start:end:step]',
          '末尾からは負のインデックスで: list[-3:]',
          'ステップ2で偶数番目: list[::2]',
        ],
        answer: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

head = nums[:3]     # [1, 2, 3]
tail = nums[-3:]    # [8, 9, 10]
evens = nums[::2]   # [1, 3, 5, 7, 9]
rev = nums[::-1]    # [10, 9, 8, ..., 1]

print(f"先頭3つ: {head}")
print(f"末尾3つ: {tail}")
print(f"偶数番目: {evens}")
print(f"逆順: {rev}")`,
        explanation: 'スライスは[start:end:step]の3つの要素で制御します。省略すると先頭/末尾/ステップ1がデフォルトになります。[::-1]で逆順は頻出パターンです。',
      },
    ],
    summary: [
      'list: JavaのArrayList相当。[]で作成、型混在OK',
      'dict: JavaのHashMap相当。{key: value}で作成',
      'tuple: 不変のリスト。()で作成、関数の複数戻り値に使用',
      'スライス: list[start:end:step] で部分取得（Java subList相当）',
      'リスト内包表記: [式 for x in list if 条件] で変換+フィルタ',
      'zip(): 複数リストをペアリング、dict()で辞書化可能',
    ],
  },
  {
    day: 3,
    week: 1,
    title: '条件分岐・ループ',
    description: 'if/elif/else、for-in、内包表記など制御フローを学びます。',
    lessons: [
      {
        title: '条件分岐',
        points: [
          'if/elif/else: Javaのif/else ifと同じだが中括弧なし、インデントで制御',
          'Pythonにはswitch文がないが、Python 3.10からmatch-case文が使える',
          '三項演算子: x if 条件 else y',
          'in演算子: リストや文字列の中に含まれるかチェック',
        ],
        comparisons: [
          {
            title: '条件分岐',
            java: `// Java
if (score >= 90) {
    grade = "A";
} else if (score >= 70) {
    grade = "B";
} else {
    grade = "C";
}

// Java 14+ switch式
String result = switch(day) {
    case "MON" -> "月曜日";
    default -> "その他";
};`,
            python: `# Python
if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"

# Python 3.10+ match-case
match day:
    case "MON":
        result = "月曜日"
    case _:
        result = "その他"`,
          },
        ],
      },
      {
        title: 'ループ',
        points: [
          'for-in: Javaの拡張for文に相当。range()で数値ループ',
          'enumerate(): インデックスと要素を同時に取得',
          'while: Javaと同じ概念だが、else句を持てる',
          'break/continue: Javaと同じ。for-elseはbreakしなかった場合にelse実行',
        ],
        comparisons: [
          {
            title: 'ループの比較',
            java: `// Java: インデックス付きfor
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// 拡張for文
for (String item : list) {
    System.out.println(item);
}`,
            python: `# Python: range() + for-in
for i in range(5):
    print(i)

# 要素を直接ループ
for item in lst:
    print(item)

# enumerate: インデックス+要素
for i, item in enumerate(lst):
    print(f"{i}: {item}")`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'FizzBuzz問題をPythonで解いてください。1から30まで、3の倍数なら"Fizz"、5の倍数なら"Buzz"、両方の倍数なら"FizzBuzz"、それ以外は数字を出力。ただし、リスト内包表記を使って結果をリストにすること。',
        hints: [
          'リスト内包表記の中で三項演算子を使えます',
          '三項演算子はネストできます: a if 条件1 else (b if 条件2 else c)',
          '15の倍数（3と5の両方）を最初に判定すること',
        ],
        answer: `result = [
    "FizzBuzz" if i % 15 == 0
    else "Fizz" if i % 3 == 0
    else "Buzz" if i % 5 == 0
    else str(i)
    for i in range(1, 31)
]
print(result)`,
        explanation: '内包表記内で三項演算子をネストしています。15の倍数を最初にチェックするのがポイント。Javaのstream().map()よりも直感的に書けます。',
      },
      {
        id: 'q2',
        question: '文字列のリスト words = ["Python", "Java", "Go", "JavaScript", "C", "TypeScript"] から、5文字以上の単語だけを大文字に変換してリスト内包表記で取り出してください。',
        hints: [
          'len(word) >= 5 でフィルタリング',
          'word.upper() で大文字変換',
          '[式 for 変数 in リスト if 条件] の形式',
        ],
        answer: `words = ["Python", "Java", "Go", "JavaScript", "C", "TypeScript"]
long_upper = [w.upper() for w in words if len(w) >= 5]
print(long_upper)  # ['PYTHON', 'JAVASCRIPT', 'TYPESCRIPT']`,
        explanation: 'フィルタ(if)と変換(upper())を1行で書けるのが内包表記の強みです。JavaのStream APIの.filter().map().collect()に相当します。',
      },
      {
        id: 'q3',
        question: 'enumerate()を使って、リスト ["月", "火", "水", "木", "金", "土", "日"] を「1: 月曜日」「2: 火曜日」...の形式で出力してください。startパラメータで1始まりにすること。',
        hints: [
          'enumerate(リスト, start=1) で1始まりのインデックスが得られます',
          'f-stringで整形しましょう',
        ],
        answer: `days = ["月", "火", "水", "木", "金", "土", "日"]
for i, day in enumerate(days, start=1):
    print(f"{i}: {day}曜日")`,
        explanation: 'enumerate()の第2引数startでインデックスの開始値を指定できます。Javaではfor(int i=1; i<=list.size(); i++)のような冗長なコードが必要ですが、Pythonでは簡潔に書けます。',
      },
      {
        id: 'q4',
        question: '2重ループとリスト内包表記を使って、九九の表（1〜9の段）を作成してください。結果は2次元リスト（リストのリスト）にし、3の段だけ出力すること。',
        hints: [
          '2重内包表記: [[式 for j in range] for i in range]',
          '外側のループが段、内側のループが列に対応',
        ],
        answer: `table = [[i * j for j in range(1, 10)] for i in range(1, 10)]

# 3の段を出力
row = table[2]  # 0-indexed
for j, val in enumerate(row, start=1):
    print(f"3 x {j} = {val}")`,
        explanation: '2重リスト内包表記では外側のforが行、内側のforが列に対応します。Javaの2重ループよりも簡潔ですが、複雑になりすぎないよう注意しましょう。',
      },
    ],
    summary: [
      'if/elif/else: 中括弧不要、インデントで制御ブロックを表現',
      'for-in: range()で数値ループ、リスト直接ループ可能',
      'enumerate(): インデックスと要素を同時取得（start引数で開始値変更）',
      'リスト内包表記: [式 for x in list if 条件] → Stream APIの簡潔版',
      'in演算子: "x" in list で存在チェック（Java contains()相当）',
      'for-else: breakしなかった場合にelse実行（Java独自のパターン）',
    ],
  },
  {
    day: 4,
    week: 1,
    title: '関数・ラムダ',
    description: 'def文、デフォルト引数、*args/**kwargs、ラムダ式を学びます。',
    lessons: [
      {
        title: '関数定義',
        points: [
          'def 関数名(引数): で定義。returnで値を返す',
          'デフォルト引数: def f(x, y=10) → Javaのオーバーロード不要',
          '*args: 可変長位置引数（タプルとして受け取る）',
          '**kwargs: 可変長キーワード引数（辞書として受け取る）',
        ],
        comparisons: [
          {
            title: '関数定義の比較',
            java: `// Java: オーバーロードが必要
public String greet(String name) {
    return greet(name, "さん");
}
public String greet(String name, String suffix) {
    return "こんにちは、" + name + suffix;
}`,
            python: `# Python: デフォルト引数で1つの関数でOK
def greet(name, suffix="さん"):
    return f"こんにちは、{name}{suffix}"

greet("田中")        # こんにちは、田中さん
greet("田中", "様")   # こんにちは、田中様`,
          },
          {
            title: '*args と **kwargs',
            java: `// Java: 可変長引数
public int sum(int... numbers) {
    return Arrays.stream(numbers).sum();
}`,
            python: `# Python: *args（タプル）, **kwargs（辞書）
def my_func(*args, **kwargs):
    print(f"位置引数: {args}")
    print(f"キーワード引数: {kwargs}")

my_func(1, 2, 3, name="田中", age=30)
# 位置引数: (1, 2, 3)
# キーワード引数: {'name': '田中', 'age': 30}`,
          },
        ],
      },
      {
        title: 'ラムダ式と高階関数',
        points: [
          'lambda 引数: 式 → 無名関数（Javaの関数型インタフェースに相当）',
          'map(), filter(), sorted() のkey引数でよく使う',
          'Pythonでは関数はファーストクラスオブジェクト（変数に代入可能）',
        ],
        comparisons: [
          {
            title: 'ラムダ式',
            java: `// Java: ラムダ式
List<String> sorted = names.stream()
    .sorted((a, b) -> a.length() - b.length())
    .collect(Collectors.toList());

Function<Integer, Integer> double_ =
    x -> x * 2;`,
            python: `# Python: lambda
sorted_names = sorted(names, key=lambda x: len(x))

double = lambda x: x * 2
print(double(5))  # 10

# map + lambda
doubled = list(map(lambda x: x * 2, [1, 2, 3]))`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '任意の数の数値を受け取り、合計・平均・最大値・最小値を辞書で返す関数 calc_stats() を作成してください。引数がゼロ個の場合はすべてNoneを返すこと。*argsを使用してください。',
        hints: [
          '*args でタプルとして受け取れます',
          'len(args) == 0 で引数なしチェック',
          'sum(), max(), min() の組み込み関数を使えます',
        ],
        answer: `def calc_stats(*args):
    if len(args) == 0:
        return {"sum": None, "avg": None, "max": None, "min": None}
    return {
        "sum": sum(args),
        "avg": sum(args) / len(args),
        "max": max(args),
        "min": min(args)
    }

print(calc_stats(10, 20, 30, 40))
print(calc_stats())`,
        explanation: '*argsはタプルとして受け取るので、len()やsum()がそのまま使えます。辞書で返すことで、呼び出し側がキー名でアクセスできます。',
      },
      {
        id: 'q2',
        question: '辞書のリスト data = [{"name": "A", "score": 85}, {"name": "B", "score": 92}, {"name": "C", "score": 78}] を、sorted() と lambda を使って score の降順にソートしてください。',
        hints: [
          'sorted(リスト, key=lambda x: x["score"]) でソートできます',
          'reverse=True で降順になります',
        ],
        answer: `data = [
    {"name": "A", "score": 85},
    {"name": "B", "score": 92},
    {"name": "C", "score": 78}
]
result = sorted(data, key=lambda x: x["score"], reverse=True)
for d in result:
    print(f'{d["name"]}: {d["score"]}点')`,
        explanation: 'sorted()のkey引数にlambdaを渡すパターンはJavaのComparatorに相当します。reverse=Trueで降順ソートになります。',
      },
      {
        id: 'q3',
        question: '関数apply_operation(numbers, operation)を作成してください。numbersはリスト、operationは関数を受け取ります。operationをnumbersの各要素に適用した新しいリストを返してください。テスト用に2乗と絶対値のラムダを渡して動作確認すること。',
        hints: [
          '高階関数: 関数を引数として受け取る関数',
          'リスト内包表記で [operation(x) for x in numbers] のように適用',
        ],
        answer: `def apply_operation(numbers, operation):
    return [operation(x) for x in numbers]

nums = [-3, -1, 0, 2, 5]
squared = apply_operation(nums, lambda x: x ** 2)
absoluted = apply_operation(nums, lambda x: abs(x))

print(f"2乗: {squared}")       # [9, 1, 0, 4, 25]
print(f"絶対値: {absoluted}")   # [3, 1, 0, 2, 5]`,
        explanation: 'Pythonでは関数をそのまま引数として渡せます。Javaでは関数型インタフェース（Function<T,R>）が必要ですが、Pythonではそのまま渡せるのが簡潔です。',
      },
      {
        id: 'q4',
        question: '**kwargsを使って、HTMLタグを生成する関数 html_tag(tag, text, **attrs) を作成してください。例: html_tag("a", "Click", href="https://example.com", class_="btn") → \'<a href="https://example.com" class="btn">Click</a>\'',
        hints: [
          '**kwargs は辞書として受け取ります',
          'class は予約語なので class_ で受け取り、"_" を除去',
          'attrs.items() でキー・値のペアをループ',
        ],
        answer: `def html_tag(tag, text, **attrs):
    attr_str = ""
    for key, value in attrs.items():
        key = key.rstrip("_")  # class_ -> class
        attr_str += f' {key}="{value}"'
    return f"<{tag}{attr_str}>{text}</{tag}>"

result = html_tag("a", "Click", href="https://example.com", class_="btn")
print(result)`,
        explanation: '**kwargsは実務でもよく使うパターンです。Pythonの予約語（class, forなど）とキーワード引数が衝突する場合、末尾に_を付ける慣例があります。',
      },
    ],
    summary: [
      'def文: returnで値を返す。Javaと違い型宣言不要',
      'デフォルト引数: Javaのオーバーロードの代わりに使える',
      '*args: 可変長引数をタプルで受け取る',
      '**kwargs: キーワード引数を辞書で受け取る',
      'lambda: 無名関数。sorted()のkey引数でよく使用',
      '関数はファーストクラスオブジェクト（変数に代入、引数に渡せる）',
    ],
  },
  {
    day: 5,
    week: 1,
    title: 'クラス・例外処理',
    description: '__init__/self、継承、try-except、カスタム例外を学びます。',
    lessons: [
      {
        title: 'クラス定義',
        points: [
          '__init__: Javaのコンストラクタに相当',
          'self: Javaのthisに相当。すべてのメソッドの第1引数に必要',
          '継承: class 子(親): で定義。super()で親メソッド呼び出し',
          '__str__: JavaのtoString()に相当',
        ],
        comparisons: [
          {
            title: 'クラスの定義',
            java: `// Java
public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    public String speak() {
        return name + "が鳴いています";
    }

    @Override
    public String toString() {
        return "Animal(" + name + ")";
    }
}`,
            python: `# Python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}が鳴いています"

    def __str__(self):
        return f"Animal({self.name})"

animal = Animal("ポチ")
print(animal.speak())
print(animal)`,
          },
          {
            title: '継承',
            java: `// Java
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public String speak() {
        return getName() + ": ワン!";
    }
}`,
            python: `# Python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def speak(self):
        return f"{self.name}: ワン!"

dog = Dog("ポチ", "柴犬")
print(dog.speak())
print(isinstance(dog, Animal))  # True`,
          },
        ],
      },
      {
        title: '例外処理',
        points: [
          'try-except: Javaのtry-catchに相当',
          'except Exception as e: でJavaのcatch(Exception e)と同じ',
          'finally: Javaと同じ。必ず実行される',
          'raise: Javaのthrowに相当。カスタム例外も定義可能',
        ],
        comparisons: [
          {
            title: '例外処理',
            java: `// Java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("エラー: " + e.getMessage());
} finally {
    System.out.println("処理完了");
}

// カスタム例外
public class MyException extends Exception {
    public MyException(String msg) { super(msg); }
}`,
            python: `# Python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"エラー: {e}")
except Exception as e:
    print(f"予期しないエラー: {e}")
finally:
    print("処理完了")

# カスタム例外
class MyException(Exception):
    pass

raise MyException("エラーメッセージ")`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'Bookクラスを作成してください。属性: title(str), author(str), price(int)。メソッド: __str__で「{title} by {author} (¥{price})」を返す、is_expensive()で3000円以上ならTrueを返す。3冊のBookインスタンスを作り、高い本だけフィルタリングして出力。',
        hints: [
          '__init__(self, title, author, price) で初期化',
          '__str__ は print() 時に呼ばれます',
          'リスト内包表記と is_expensive() を組み合わせてフィルタ',
        ],
        answer: `class Book:
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price

    def __str__(self):
        return f"{self.title} by {self.author} (¥{self.price})"

    def is_expensive(self):
        return self.price >= 3000

books = [
    Book("Python入門", "著者A", 2800),
    Book("データ分析実践", "著者B", 3500),
    Book("機械学習入門", "著者C", 4200),
]

expensive = [b for b in books if b.is_expensive()]
for book in expensive:
    print(book)`,
        explanation: '__str__を定義すると、print()やf-string内でオブジェクトを文字列として扱えます。JavaのtoString()と同じ役割です。',
      },
      {
        id: 'q2',
        question: 'Animalクラスを親クラスとし、DogとCatを子クラスとして作成してください。Animalにはname属性とspeak()メソッド、DogのspeakはΓワン!」、Catは「ニャー!」を返す。さらにリストに入れてポリモーフィズムを確認してください。',
        hints: [
          'class Dog(Animal): で継承',
          'super().__init__(name) で親のコンストラクタ呼び出し',
          'speak() をオーバーライドする',
        ],
        answer: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}が鳴いています"

class Dog(Animal):
    def speak(self):
        return f"{self.name}: ワン!"

class Cat(Animal):
    def speak(self):
        return f"{self.name}: ニャー!"

animals = [Dog("ポチ"), Cat("タマ"), Dog("ハチ")]
for animal in animals:
    print(animal.speak())`,
        explanation: 'Pythonでもポリモーフィズムが使えます。Javaと違い、interfaceやabstractの宣言なしでメソッドのオーバーライドが可能です（ダックタイピング）。',
      },
      {
        id: 'q3',
        question: 'カスタム例外 InsufficientBalanceError を作成し、BankAccountクラスを実装してください。deposit(amount)で入金、withdraw(amount)で出金。残高不足の場合は InsufficientBalanceError を発生させること。',
        hints: [
          'class InsufficientBalanceError(Exception): で定義',
          'withdraw で self.balance < amount なら raise',
          'try-except で呼び出し側で例外をキャッチ',
        ],
        answer: `class InsufficientBalanceError(Exception):
    pass

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientBalanceError(
                f"残高不足: 残高{self.balance}円に対して{amount}円の出金"
            )
        self.balance -= amount
        return self.balance

account = BankAccount("田中", 10000)
account.deposit(5000)
try:
    account.withdraw(20000)
except InsufficientBalanceError as e:
    print(f"エラー: {e}")`,
        explanation: 'カスタム例外はExceptionを継承して作成します。Javaと同じく、ビジネスロジックのエラーを適切な例外で表現することが重要です。',
      },
    ],
    summary: [
      'class: __init__がコンストラクタ、selfがthisに相当',
      '継承: class 子(親):。super()で親メソッド呼び出し',
      '__str__: JavaのtoString()相当。print()時に使われる',
      'try-except-finally: Javaのtry-catch-finallyと同じ構造',
      'raise: Javaのthrow相当。カスタム例外はExceptionを継承',
      'isinstance(): Javaのinstanceofに相当',
    ],
  },

  // ============================================================
  // Week 2: 標準ライブラリ
  // ============================================================
  {
    day: 6,
    week: 2,
    title: '文字列操作',
    description: 'split/join/strip、正規表現(re)、フォーマットを学びます。',
    lessons: [
      {
        title: '文字列メソッド',
        points: [
          'split(): 区切り文字で分割（JavaのString.split()と同じ）',
          'join(): リストを結合（Java String.join()に相当だがメソッドの呼び方が逆）',
          'strip()/lstrip()/rstrip(): 空白除去（JavaのString.strip()相当）',
          'replace(), startswith(), endswith(), find(), count()',
        ],
        comparisons: [
          {
            title: '文字列操作',
            java: `// Java
String csv = "a,b,c";
String[] parts = csv.split(",");
String joined = String.join("-", parts);
String trimmed = "  hello  ".strip();
boolean starts = "hello".startsWith("he");`,
            python: `# Python
csv = "a,b,c"
parts = csv.split(",")       # ['a', 'b', 'c']
joined = "-".join(parts)     # "a-b-c"
trimmed = "  hello  ".strip()  # "hello"
starts = "hello".startswith("he")  # True`,
          },
        ],
      },
      {
        title: '正規表現（re）',
        points: [
          'import re で正規表現モジュールを使用',
          're.search(): マッチ判定、re.findall(): 全マッチ取得',
          're.sub(): 置換（JavaのString.replaceAll相当）',
          'r"..." で生文字列（バックスラッシュのエスケープ不要）',
        ],
        comparisons: [
          {
            title: '正規表現',
            java: `// Java
Pattern p = Pattern.compile("\\\\d+");
Matcher m = p.matcher("abc123def456");
while (m.find()) {
    System.out.println(m.group());
}
String result = "abc123".replaceAll("\\\\d+", "X");`,
            python: `# Python
import re
matches = re.findall(r"\\d+", "abc123def456")
# ['123', '456']

result = re.sub(r"\\d+", "X", "abc123")
# "abcX"

# メールアドレス抽出
emails = re.findall(r"[\\w.]+@[\\w.]+", text)`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'CSVフォーマットの文字列 "田中,30,東京,エンジニア" をsplit()で分割し、「名前: 田中, 年齢: 30歳, 都市: 東京, 職業: エンジニア」の形式で出力してください。',
        hints: [
          'split(",") でカンマ区切り',
          'アンパックを使うと変数に一度に代入できます',
        ],
        answer: `csv = "田中,30,東京,エンジニア"
name, age, city, job = csv.split(",")
print(f"名前: {name}, 年齢: {age}歳, 都市: {city}, 職業: {job}")`,
        explanation: 'split()の結果をタプルアンパックで直接複数変数に代入できるのはPythonの便利な機能です。',
      },
      {
        id: 'q2',
        question: '正規表現を使って、テキスト "注文番号: ORD-2024-001, ORD-2024-045, ORD-2024-123" からすべての注文番号（ORD-XXXX-XXX形式）を抽出してください。',
        hints: [
          're.findall() でパターンにマッチするすべての文字列を取得',
          'パターン: r"ORD-\\d{4}-\\d{3}"',
        ],
        answer: `import re
text = "注文番号: ORD-2024-001, ORD-2024-045, ORD-2024-123"
orders = re.findall(r"ORD-\\d{4}-\\d{3}", text)
print(orders)  # ['ORD-2024-001', 'ORD-2024-045', 'ORD-2024-123']`,
        explanation: 're.findall()はマッチする全ての文字列をリストで返します。\\d{4}は「数字4桁」を意味します。',
      },
      {
        id: 'q3',
        question: 'リスト ["  Hello  ", "  World  ", " Python "] の各要素の前後の空白を除去し、すべて小文字に変換してから " | " で結合して出力してください。',
        hints: [
          'strip() で前後の空白除去',
          'lower() で小文字変換',
          '" | ".join(リスト) で結合',
        ],
        answer: `words = ["  Hello  ", "  World  ", " Python "]
cleaned = [w.strip().lower() for w in words]
result = " | ".join(cleaned)
print(result)  # "hello | world | python"`,
        explanation: 'メソッドチェーン（strip().lower()）とリスト内包表記でデータクリーニングを1行で表現できます。',
      },
    ],
    summary: [
      'split()/join(): 文字列の分割と結合（joinはJavaと呼び方が逆）',
      'strip(): 前後の空白除去、replace(): 文字列置換',
      're.findall(): 正規表現で全マッチ取得',
      're.sub(): 正規表現で置換（JavaのreplaceAll相当）',
      'r"..." : 生文字列でバックスラッシュのエスケープ不要',
      'メソッドチェーン: strip().lower().replace() のように連結可能',
    ],
  },
  {
    day: 7,
    week: 2,
    title: 'ファイル操作',
    description: 'with open、読み書き、pathlib、osモジュールを学びます。',
    lessons: [
      {
        title: 'ファイルの読み書き',
        points: [
          'with open() as f: でファイルを安全に操作（Javaのtry-with-resourcesに相当）',
          '"r"(読み), "w"(書き), "a"(追記) でモード指定',
          'encoding="utf-8" で文字コード指定',
          'f.read(), f.readlines(), f.readline() で読み込み',
        ],
        comparisons: [
          {
            title: 'ファイル読み書き',
            java: `// Java: try-with-resources
try (BufferedReader br = new BufferedReader(
        new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
// 書き込み
try (BufferedWriter bw = new BufferedWriter(
        new FileWriter("out.txt"))) {
    bw.write("Hello");
}`,
            python: `# Python: with文
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())

# 書き込み
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("Hello\\n")

# 全行をリストで取得
with open("data.txt") as f:
    lines = f.readlines()`,
          },
        ],
      },
      {
        title: 'pathlib',
        points: [
          'from pathlib import Path: モダンなパス操作',
          'Path("dir") / "file.txt": パス結合（os.path.joinの代替）',
          'path.exists(), path.is_file(), path.is_dir(): 存在チェック',
          'path.suffix: 拡張子、path.stem: ファイル名（拡張子なし）',
        ],
        comparisons: [
          {
            title: 'パス操作',
            java: `// Java: Path + Files
Path path = Paths.get("data", "file.txt");
boolean exists = Files.exists(path);
List<String> lines = Files.readAllLines(path);
Files.write(path, lines);`,
            python: `# Python: pathlib
from pathlib import Path

path = Path("data") / "file.txt"
exists = path.exists()
text = path.read_text(encoding="utf-8")
path.write_text("内容", encoding="utf-8")

# ディレクトリ内のファイル一覧
for p in Path(".").glob("*.txt"):
    print(p.name)`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'with open を使って、テキストファイルに5行のデータを書き込み、その後読み込んで行番号付きで出力するコードを書いてください。',
        hints: [
          '"w" モードで書き込み、"r" モードで読み込み',
          'enumerate() で行番号を付与',
        ],
        answer: `# 書き込み
with open("sample.txt", "w", encoding="utf-8") as f:
    for i in range(1, 6):
        f.write(f"これは{i}行目のデータです\\n")

# 読み込み
with open("sample.txt", "r", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        print(f"{i}: {line.strip()}")`,
        explanation: 'with文はブロックを抜けると自動的にファイルを閉じます。Javaのtry-with-resourcesと同じ安全なパターンです。',
      },
      {
        id: 'q2',
        question: 'pathlibを使って、カレントディレクトリ内のすべての.pyファイルを検索し、ファイル名とサイズ(bytes)を表示するスクリプトを書いてください。.pyファイルがない場合は「.pyファイルはありません」と表示すること。',
        hints: [
          'Path(".").glob("*.py") で検索',
          'path.stat().st_size でファイルサイズ取得',
        ],
        answer: `from pathlib import Path

py_files = list(Path(".").glob("*.py"))
if not py_files:
    print(".pyファイルはありません")
else:
    for p in py_files:
        size = p.stat().st_size
        print(f"{p.name}: {size} bytes")`,
        explanation: 'pathlib.Path.glob()はジェネレータを返すので、list()で変換するか直接forで回します。stat()でファイルのメタ情報を取得できます。',
      },
      {
        id: 'q3',
        question: 'テキストファイルを読み込み、各行の文字数をカウントして、合計文字数と最長行を出力する関数 analyze_file(filepath) を作成してください。ファイルが存在しない場合はFileNotFoundErrorをキャッチしてメッセージを表示すること。',
        hints: [
          'try-except で FileNotFoundError をキャッチ',
          'strip() で改行を除去してからlen()でカウント',
          'max() のkey引数で最長行を見つける',
        ],
        answer: `def analyze_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f.readlines()]

        total = sum(len(line) for line in lines)
        longest = max(lines, key=len) if lines else ""

        print(f"行数: {len(lines)}")
        print(f"合計文字数: {total}")
        print(f"最長行: {longest} ({len(longest)}文字)")
    except FileNotFoundError:
        print(f"ファイルが見つかりません: {filepath}")

analyze_file("sample.txt")`,
        explanation: 'ファイル操作では必ず例外処理を入れましょう。Javaでも同じですが、Pythonではtry-exceptがシンプルに書けます。',
      },
    ],
    summary: [
      'with open(): Javaのtry-with-resources相当。自動close',
      '"r"/"w"/"a": 読み/書き/追記モード',
      'pathlib.Path: モダンなパス操作（Path("/") で結合）',
      'path.glob("*.txt"): ファイル検索（Javaの Files.walk相当）',
      'encoding="utf-8": 文字コード明示（日本語ファイルでは必須）',
    ],
  },
  {
    day: 8,
    week: 2,
    title: 'JSON/CSV処理',
    description: 'json.loads/dumps、csv.reader/writer、データ変換を学びます。',
    lessons: [
      {
        title: 'JSON処理',
        points: [
          'json.loads(): JSON文字列 → Pythonの辞書/リスト',
          'json.dumps(): Pythonオブジェクト → JSON文字列',
          'json.load()/json.dump(): ファイルから/へ直接読み書き',
          'ensure_ascii=False で日本語をエスケープせずに出力',
        ],
        comparisons: [
          {
            title: 'JSON処理',
            java: `// Java (Jackson)
ObjectMapper mapper = new ObjectMapper();
Map<String, Object> data =
    mapper.readValue(jsonStr, Map.class);
String json = mapper.writeValueAsString(data);`,
            python: `# Python
import json

data = json.loads('{"name": "田中", "age": 30}')
print(data["name"])  # "田中"

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)`,
          },
        ],
      },
      {
        title: 'CSV処理',
        points: [
          'csv.reader(): CSVファイルを行ごとのリストとして読み込み',
          'csv.DictReader(): ヘッダー付きCSVを辞書のリストとして読み込み',
          'csv.writer()/csv.DictWriter(): CSV書き込み',
        ],
        comparisons: [
          {
            title: 'CSV処理',
            java: `// Java (OpenCSV等のライブラリが必要)
CSVReader reader = new CSVReader(
    new FileReader("data.csv"));
List<String[]> rows = reader.readAll();`,
            python: `# Python (標準ライブラリのみ)
import csv

with open("data.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '以下のPython辞書をJSON文字列に変換し、ファイルに保存してから読み直してください。日本語が正しく表示されること。\ndata = {"users": [{"name": "田中", "age": 30}, {"name": "鈴木", "age": 25}]}',
        hints: [
          'json.dump() でファイルに書き込み',
          'ensure_ascii=False で日本語をそのまま保持',
          'indent=2 で整形出力',
        ],
        answer: `import json

data = {"users": [{"name": "田中", "age": 30}, {"name": "鈴木", "age": 25}]}

with open("users.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("users.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

for user in loaded["users"]:
    print(f'{user["name"]} ({user["age"]}歳)')`,
        explanation: 'ensure_ascii=Falseを忘れると日本語が\\uXXXXのエスケープ形式になります。indent指定で読みやすいJSONが出力されます。',
      },
      {
        id: 'q2',
        question: 'CSV文字列からDictReaderでデータを読み込み、scoreが80以上の人だけフィルタリングして新しいCSVファイルに書き出してください。\nCSVデータ: "name,score\\n田中,85\\n鈴木,72\\n佐藤,91\\n山田,68"',
        hints: [
          'io.StringIO() で文字列をファイルオブジェクトのように扱えます',
          'csv.DictWriter でヘッダー付き書き込み',
          'int(row["score"]) で文字列を数値に変換してフィルタ',
        ],
        answer: `import csv
import io

csv_data = "name,score\\n田中,85\\n鈴木,72\\n佐藤,91\\n山田,68"

reader = csv.DictReader(io.StringIO(csv_data))
high_scores = [row for row in reader if int(row["score"]) >= 80]

with open("high_scores.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(high_scores)

print(f"{len(high_scores)}人が80点以上")`,
        explanation: 'io.StringIO()は文字列をファイルオブジェクトとして扱えるユーティリティです。DictReaderとDictWriterを使うとキー名でアクセスでき可読性が高いです。',
      },
      {
        id: 'q3',
        question: 'ネストされたJSONデータから特定の情報を抽出してフラットな辞書のリストに変換してください。\n入力: {"company": "ABC社", "departments": [{"name": "開発部", "members": [{"name": "田中"}, {"name": "鈴木"}]}, {"name": "営業部", "members": [{"name": "佐藤"}]}]}\n出力: [{"company": "ABC社", "department": "開発部", "member": "田中"}, ...]',
        hints: [
          '2重ループで departments → members をフラット化',
          '各ループで必要な情報を辞書に詰める',
        ],
        answer: `import json

data = {
    "company": "ABC社",
    "departments": [
        {"name": "開発部", "members": [{"name": "田中"}, {"name": "鈴木"}]},
        {"name": "営業部", "members": [{"name": "佐藤"}]}
    ]
}

flat = [
    {"company": data["company"], "department": dept["name"], "member": m["name"]}
    for dept in data["departments"]
    for m in dept["members"]
]

print(json.dumps(flat, ensure_ascii=False, indent=2))`,
        explanation: 'ネストされたJSONのフラット化は実務で頻出のパターンです。リスト内包表記の多重forで2重ループを簡潔に書けます。',
      },
    ],
    summary: [
      'json.loads()/dumps(): 文字列とPythonオブジェクトの変換',
      'json.load()/dump(): ファイルとの直接読み書き',
      'ensure_ascii=False: 日本語をエスケープしない設定',
      'csv.DictReader/DictWriter: ヘッダー付きCSV操作',
      'io.StringIO(): 文字列をファイルオブジェクトとして扱う',
    ],
  },
  {
    day: 9,
    week: 2,
    title: '日付・時刻',
    description: 'datetime、timedelta、strftime/strptimeを学びます。',
    lessons: [
      {
        title: 'datetime基礎',
        points: [
          'datetime.datetime.now(): 現在日時取得（JavaのLocalDateTime.now()相当）',
          'datetime.date.today(): 今日の日付',
          'strftime(): 日時→文字列（JavaのDateTimeFormatter.format相当）',
          'strptime(): 文字列→日時（JavaのDateTimeFormatter.parse相当）',
        ],
        comparisons: [
          {
            title: '日時操作',
            java: `// Java
LocalDateTime now = LocalDateTime.now();
String formatted = now.format(
    DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm"));
LocalDateTime parsed = LocalDateTime.parse(
    "2024-01-01T00:00",
    DateTimeFormatter.ISO_LOCAL_DATE_TIME);`,
            python: `# Python
from datetime import datetime, timedelta

now = datetime.now()
formatted = now.strftime("%Y/%m/%d %H:%M")
parsed = datetime.strptime(
    "2024-01-01 00:00", "%Y-%m-%d %H:%M")

# timedelta: 日時の加減算
tomorrow = now + timedelta(days=1)
diff = datetime(2024, 12, 31) - now`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '現在の日時を「2024年1月1日 (月) 15:30」の形式で出力してください。さらに、30日後の日時も同じ形式で出力してください。',
        hints: [
          'strftime("%Y年%m月%d日 (%a) %H:%M") でフォーマット',
          'timedelta(days=30) で30日加算',
          '曜日の日本語化: 辞書で変換する方法がシンプル',
        ],
        answer: `from datetime import datetime, timedelta

weekdays = {"Mon": "月", "Tue": "火", "Wed": "水",
            "Thu": "木", "Fri": "金", "Sat": "土", "Sun": "日"}

now = datetime.now()
future = now + timedelta(days=30)

def format_date(dt):
    wd = weekdays[dt.strftime("%a")]
    return dt.strftime(f"%Y年%m月%d日 ({wd}) %H:%M")

print(f"今日: {format_date(now)}")
print(f"30日後: {format_date(future)}")`,
        explanation: 'strftime()の%aは英語の曜日略称を返すので、辞書で日本語に変換しています。timedelteで日時の加減算が簡単にできます。',
      },
      {
        id: 'q2',
        question: '生年月日の文字列 "1994-05-15" から、現在の年齢を計算してください。また、次の誕生日まであと何日かも計算してください。',
        hints: [
          'strptime() で文字列→datetimeに変換',
          '年齢は年の差から、今年の誕生日がまだなら-1',
          '次の誕生日: 今年のか来年の誕生日との差',
        ],
        answer: `from datetime import datetime, date

birthday_str = "1994-05-15"
birthday = datetime.strptime(birthday_str, "%Y-%m-%d").date()
today = date.today()

age = today.year - birthday.year
if (today.month, today.day) < (birthday.month, birthday.day):
    age -= 1

next_birthday = birthday.replace(year=today.year)
if next_birthday < today:
    next_birthday = birthday.replace(year=today.year + 1)
days_until = (next_birthday - today).days

print(f"年齢: {age}歳")
print(f"次の誕生日まで: {days_until}日")`,
        explanation: '日付の比較にはタプルの比較が便利です。(month, day)のタプルで月日の前後を判定できます。',
      },
      {
        id: 'q3',
        question: '日付文字列のリスト ["2024-01-15", "2024-03-22", "2024-02-10"] をdatetimeオブジェクトに変換し、日付順にソートして「YYYY年MM月DD日」形式で出力してください。',
        hints: [
          'strptime で文字列→datetime変換',
          'sorted() でソート可能（datetimeは比較演算子をサポート）',
        ],
        answer: `from datetime import datetime

dates_str = ["2024-01-15", "2024-03-22", "2024-02-10"]
dates = [datetime.strptime(d, "%Y-%m-%d") for d in dates_str]
dates.sort()

for d in dates:
    print(d.strftime("%Y年%m月%d日"))`,
        explanation: 'datetimeオブジェクトは比較演算子をサポートしているので、sorted()やsort()でそのまま日付順にソートできます。',
      },
    ],
    summary: [
      'datetime.now(): 現在日時（JavaのLocalDateTime.now()相当）',
      'strftime(): 日時→文字列（フォーマット指定）',
      'strptime(): 文字列→日時（パース）',
      'timedelta: 日時の加減算（days, hours, minutes等）',
      '日時の比較: そのまま <, >, == で比較可能',
    ],
  },
  {
    day: 10,
    week: 2,
    title: 'コレクション応用',
    description: 'collections(Counter, defaultdict)、itertoolsを学びます。',
    lessons: [
      {
        title: 'collections',
        points: [
          'Counter: 要素の出現回数をカウント（JavaのStream + Collectors.groupingBy相当）',
          'defaultdict: キーが存在しない場合のデフォルト値を設定（JavaのgetOrDefault不要）',
          'OrderedDict: 挿入順序を保持する辞書（Python3.7+では通常のdictも保持）',
        ],
        comparisons: [
          {
            title: 'Counter',
            java: `// Java
Map<String, Long> counts = words.stream()
    .collect(Collectors.groupingBy(
        w -> w, Collectors.counting()));`,
            python: `# Python
from collections import Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counter = Counter(words)
print(counter)             # Counter({'apple': 3, 'banana': 2, ...})
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]`,
          },
        ],
      },
      {
        title: 'itertools',
        points: [
          'itertools.chain(): 複数イテラブルを連結',
          'itertools.groupby(): グループ化（ソート済みデータに使用）',
          'itertools.product(): 直積（全組み合わせ）',
          'itertools.combinations(): 組み合わせ生成',
        ],
        comparisons: [
          {
            title: 'itertools',
            java: `// Java Stream
Stream.concat(stream1, stream2);
// 組み合わせは手動実装が必要`,
            python: `# Python
import itertools

# 2つのリストの全組み合わせ
colors = ["赤", "青"]
sizes = ["S", "M", "L"]
for c, s in itertools.product(colors, sizes):
    print(f"{c}-{s}")

# 3つから2つ選ぶ組み合わせ
for combo in itertools.combinations([1,2,3,4], 2):
    print(combo)`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'Counterを使って、テキスト "python is great and python is easy and python is fun" の単語出現回数をカウントし、上位3つを出力してください。',
        hints: [
          'split() で単語に分割してからCounterに渡す',
          'most_common(3) で上位3つ取得',
        ],
        answer: `from collections import Counter

text = "python is great and python is easy and python is fun"
words = text.split()
counter = Counter(words)

for word, count in counter.most_common(3):
    print(f"{word}: {count}回")`,
        explanation: 'Counterはイテラブルを受け取って要素の出現回数を辞書形式で返します。most_common()で頻度順に取得でき、テキスト分析でよく使います。',
      },
      {
        id: 'q2',
        question: 'defaultdictを使って、以下の社員データを部署ごとにグループ化してください。\nemployees = [("開発部", "田中"), ("営業部", "鈴木"), ("開発部", "佐藤"), ("営業部", "山田"), ("開発部", "高橋")]',
        hints: [
          'defaultdict(list) でデフォルト値をリストに設定',
          'キーが存在しなくても直接appendできます',
        ],
        answer: `from collections import defaultdict

employees = [("開発部", "田中"), ("営業部", "鈴木"), ("開発部", "佐藤"),
             ("営業部", "山田"), ("開発部", "高橋")]

dept_members = defaultdict(list)
for dept, name in employees:
    dept_members[dept].append(name)

for dept, members in dept_members.items():
    print(f"{dept}: {', '.join(members)}")`,
        explanation: 'defaultdict(list)を使うと、キーの存在チェックなしで直接appendできます。Javaのcomputeにfabsentに相当する機能です。',
      },
      {
        id: 'q3',
        question: 'itertools.productを使って、3つのサイコロを振った時のすべての出目の組み合わせのうち、合計が10以上になるものの数を数えてください。',
        hints: [
          'itertools.product(range(1,7), repeat=3) で3つのサイコロの全組み合わせ',
          'sum(combo) >= 10 でフィルタ',
        ],
        answer: `import itertools

combos = list(itertools.product(range(1, 7), repeat=3))
high_sum = [c for c in combos if sum(c) >= 10]

print(f"全組み合わせ数: {len(combos)}")
print(f"合計10以上: {len(high_sum)}")
print(f"確率: {len(high_sum)/len(combos)*100:.1f}%")`,
        explanation: 'itertools.productのrepeat引数で同じイテラブルの直積を簡単に生成できます。確率のシミュレーションなどに便利です。',
      },
    ],
    summary: [
      'Counter: 出現回数カウント、most_common()で頻度順取得',
      'defaultdict: デフォルト値付き辞書（キーなしでも安全にアクセス）',
      'itertools.product: 直積（全組み合わせ）生成',
      'itertools.combinations: 組み合わせ生成',
      'itertools.chain: 複数イテラブルの連結',
    ],
  },

  // ============================================================
  // Week 3: 実務スキル
  // ============================================================
  {
    day: 11,
    week: 3,
    title: 'API連携（GET）',
    description: 'requests.get、レスポンス処理、JSON解析を学びます。',
    lessons: [
      {
        title: 'requests でGETリクエスト',
        points: [
          'requests.get(url): GETリクエスト送信',
          'response.json(): レスポンスをJSONとしてパース',
          'response.status_code: HTTPステータスコード',
          'params引数: クエリパラメータを辞書で渡せる',
        ],
        comparisons: [
          {
            title: 'GETリクエスト',
            java: `// Java (Spring RestTemplate)
RestTemplate rest = new RestTemplate();
ResponseEntity<String> res =
    rest.getForEntity(url, String.class);
ObjectMapper mapper = new ObjectMapper();
Map data = mapper.readValue(
    res.getBody(), Map.class);`,
            python: `# Python (requests)
import requests

response = requests.get(
    "https://api.example.com/users",
    params={"page": 1, "limit": 10}
)

if response.status_code == 200:
    data = response.json()
    for user in data:
        print(user["name"])`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'requests.getを使ってAPIからデータを取得する関数 fetch_data(url) を作成してください。ステータスコードが200以外の場合はエラーメッセージを表示し、Noneを返すこと。200の場合はJSONをパースして返してください。',
        hints: [
          'response.status_code で状態確認',
          'response.json() でJSONパース',
          'try-except でネットワークエラーもキャッチ',
        ],
        answer: `import requests

def fetch_data(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"エラー: ステータスコード {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"通信エラー: {e}")
        return None

# 使用例
data = fetch_data("https://jsonplaceholder.typicode.com/todos/1")
if data:
    print(data)`,
        explanation: 'timeout引数でタイムアウトを設定し、RequestExceptionで通信エラーをまとめてキャッチするのが実務のベストプラクティスです。',
      },
      {
        id: 'q2',
        question: 'ページネーション対応の関数 fetch_all_pages(base_url, max_pages=5) を作成してください。page=1から始めて、空のリストが返るまでデータを取得し続けてください。',
        hints: [
          'while ループで page を増やしながらリクエスト',
          'params={"page": page} でページ指定',
          'データが空リストなら break',
        ],
        answer: `import requests

def fetch_all_pages(base_url, max_pages=5):
    all_data = []
    for page in range(1, max_pages + 1):
        response = requests.get(base_url, params={"page": page}, timeout=10)
        if response.status_code != 200:
            break
        data = response.json()
        if not data:
            break
        all_data.extend(data)
        print(f"ページ {page}: {len(data)}件取得")
    return all_data

# 使用例
# results = fetch_all_pages("https://api.example.com/items")`,
        explanation: 'ページネーションではmax_pagesで上限を設けるのが安全です。extend()でリストにまとめて追加できます。',
      },
      {
        id: 'q3',
        question: 'APIレスポンスのJSONから特定のフィールドだけを抽出して整形する関数を作成してください。入力は辞書のリスト、抽出するキーのリストを受け取り、新しい辞書のリストを返します。',
        hints: [
          '辞書内包表記で必要なキーだけ抽出',
          'リスト内包表記と組み合わせる',
        ],
        answer: `def extract_fields(data, fields):
    return [
        {key: item.get(key, None) for key in fields}
        for item in data
    ]

# テスト
sample = [
    {"id": 1, "name": "田中", "email": "tanaka@test.com", "age": 30},
    {"id": 2, "name": "鈴木", "email": "suzuki@test.com", "age": 25},
]
result = extract_fields(sample, ["name", "email"])
print(result)
# [{'name': '田中', 'email': 'tanaka@test.com'}, ...]`,
        explanation: '辞書内包表記とリスト内包表記のネストで、データの射影（projection）を簡潔に書けます。.get(key, None)でキーが存在しない場合もエラーを避けられます。',
      },
    ],
    summary: [
      'requests.get(): GETリクエスト（Spring RestTemplate相当）',
      'response.json(): レスポンスのJSONパース',
      'params引数: クエリパラメータを辞書で渡す',
      'timeout: タイムアウト設定は必須',
      'try-except RequestException: 通信エラーのハンドリング',
    ],
  },
  {
    day: 12,
    week: 3,
    title: 'API連携（POST）',
    description: 'requests.post、ヘッダー、認証、エラーハンドリングを学びます。',
    lessons: [
      {
        title: 'POSTリクエスト',
        points: [
          'requests.post(url, json=data): JSONデータを送信',
          'headers引数: カスタムヘッダー（認証トークンなど）',
          'response.raise_for_status(): エラー時に例外を発生',
          'セッション: requests.Session()でCookie管理・接続再利用',
        ],
        comparisons: [
          {
            title: 'POSTリクエスト',
            java: `// Java (Spring RestTemplate)
HttpHeaders headers = new HttpHeaders();
headers.set("Authorization", "Bearer " + token);
headers.setContentType(MediaType.APPLICATION_JSON);
HttpEntity<Map> entity = new HttpEntity<>(data, headers);
ResponseEntity<Map> res = rest.postForEntity(
    url, entity, Map.class);`,
            python: `# Python
import requests

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
response = requests.post(
    "https://api.example.com/data",
    json={"name": "田中", "age": 30},
    headers=headers,
    timeout=10
)
response.raise_for_status()
result = response.json()`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'POSTリクエストを送信する汎用関数 post_json(url, data, token=None) を作成してください。tokenが指定された場合はAuthorizationヘッダーに設定。レスポンスのステータスコードとJSONボディを辞書で返すこと。',
        hints: [
          'headers辞書にAuthorizationを条件付きで追加',
          'response.status_codeとresponse.json()をまとめて返す',
        ],
        answer: `import requests

def post_json(url, data, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    try:
        response = requests.post(url, json=data, headers=headers, timeout=10)
        return {
            "status": response.status_code,
            "body": response.json() if response.text else None
        }
    except requests.RequestException as e:
        return {"status": 0, "body": None, "error": str(e)}

# 使用例
result = post_json(
    "https://jsonplaceholder.typicode.com/posts",
    {"title": "テスト", "body": "本文", "userId": 1}
)
print(result)`,
        explanation: 'トークン認証のパターンはAPIクライアントの基本です。エラー時もステータスコード0で統一的に返すことで呼び出し側の処理が簡潔になります。',
      },
      {
        id: 'q2',
        question: 'リトライ機能付きのPOST関数を作成してください。status_codeが500以上の場合、最大3回まで1秒間隔でリトライし、それでもダメなら最後のレスポンスを返すこと。',
        hints: [
          'for ループで最大リトライ回数をカウント',
          'time.sleep(1) でウェイト',
          'ステータスコード500未満ならbreakで抜ける',
        ],
        answer: `import requests
import time

def post_with_retry(url, data, max_retries=3):
    for attempt in range(1, max_retries + 1):
        try:
            response = requests.post(url, json=data, timeout=10)
            if response.status_code < 500:
                return response
            print(f"リトライ {attempt}/{max_retries} (status: {response.status_code})")
            if attempt < max_retries:
                time.sleep(1)
        except requests.RequestException as e:
            print(f"通信エラー (リトライ {attempt}/{max_retries}): {e}")
            if attempt < max_retries:
                time.sleep(1)
    return response

# 使用例
# result = post_with_retry("https://api.example.com/data", {"key": "value"})`,
        explanation: 'リトライパターンは実務で非常に重要です。500系エラーは一時的な問題の可能性があるためリトライ対象とし、400系はクライアント側の問題なのでリトライしないのが一般的です。',
      },
      {
        id: 'q3',
        question: 'Webhook通知を送信する関数 send_webhook(url, message, level="info") を作成してください。levelは "info", "warning", "error" のいずれか。JSON形式で {"text": message, "level": level, "timestamp": "ISO形式の現在時刻"} を送信してください。',
        hints: [
          'datetime.now().isoformat() でISO形式の時刻',
          'requests.post の json 引数に辞書を渡す',
        ],
        answer: `import requests
from datetime import datetime

def send_webhook(url, message, level="info"):
    payload = {
        "text": message,
        "level": level,
        "timestamp": datetime.now().isoformat()
    }
    try:
        response = requests.post(url, json=payload, timeout=5)
        response.raise_for_status()
        print(f"[{level.upper()}] 通知送信成功")
        return True
    except requests.RequestException as e:
        print(f"通知送信失敗: {e}")
        return False

# 使用例
# send_webhook("https://hooks.example.com/webhook", "デプロイ完了", "info")`,
        explanation: 'Webhook通知はSlackやTeamsなどの連携でよく使います。raise_for_status()で4xx/5xxをまとめて例外にできます。',
      },
    ],
    summary: [
      'requests.post(): json引数でJSON送信（Spring RestTemplate相当）',
      'headers: Authorization等のカスタムヘッダー設定',
      'raise_for_status(): エラーレスポンスを例外に変換',
      'リトライパターン: 500系エラーは一時的なため再試行',
      'Webhook: イベント通知の基本パターン',
    ],
  },
  {
    day: 13,
    week: 3,
    title: 'データ加工',
    description: 'リスト/辞書の変換パターン、フィルタ・集計・整形を学びます。',
    lessons: [
      {
        title: 'データ変換パターン',
        points: [
          'map/filter/reduce: JavaのStream APIに相当',
          'リスト/辞書内包表記が主流（map/filterより読みやすい）',
          'データパイプライン: 入力→フィルタ→変換→集計→出力',
          'グルーピングとピボット: 辞書のdefaultdictで集約',
        ],
        comparisons: [
          {
            title: 'データ加工パターン',
            java: `// Java Stream API
List<String> result = users.stream()
    .filter(u -> u.getAge() >= 20)
    .map(u -> u.getName().toUpperCase())
    .sorted()
    .collect(Collectors.toList());

Map<String, List<User>> grouped = users.stream()
    .collect(Collectors.groupingBy(User::getDept));`,
            python: `# Python: 内包表記がメイン
result = sorted([
    u["name"].upper()
    for u in users
    if u["age"] >= 20
])

# グルーピング
from collections import defaultdict
grouped = defaultdict(list)
for u in users:
    grouped[u["dept"]].append(u)`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '以下の売上データから、部門別の売上合計と平均を計算して出力してください。\nsales = [{"dept": "開発", "amount": 100}, {"dept": "営業", "amount": 200}, {"dept": "開発", "amount": 150}, {"dept": "営業", "amount": 300}, {"dept": "開発", "amount": 120}]',
        hints: [
          'defaultdict(list) で部門ごとの金額リストを作る',
          'sum() と len() で合計と平均を計算',
        ],
        answer: `from collections import defaultdict

sales = [
    {"dept": "開発", "amount": 100}, {"dept": "営業", "amount": 200},
    {"dept": "開発", "amount": 150}, {"dept": "営業", "amount": 300},
    {"dept": "開発", "amount": 120}
]

dept_sales = defaultdict(list)
for s in sales:
    dept_sales[s["dept"]].append(s["amount"])

for dept, amounts in dept_sales.items():
    total = sum(amounts)
    avg = total / len(amounts)
    print(f"{dept}: 合計={total}, 平均={avg:.0f}, 件数={len(amounts)}")`,
        explanation: 'defaultdict(list)でグルーピング→sum()/len()で集計のパターンは、SQLのGROUP BYに相当するPythonの定番パターンです。',
      },
      {
        id: 'q2',
        question: 'ネストされた辞書のリストをフラットな辞書のリストに変換する関数 flatten_records(data, prefix="") を作成してください。キーは "parent_child" のようにアンダースコアで結合。\n例: {"user": {"name": "田中", "address": {"city": "東京"}}} → {"user_name": "田中", "user_address_city": "東京"}',
        hints: [
          '再帰関数でネストを辿る',
          'isinstance(value, dict) で辞書かどうか判定',
          'prefixを連結しながら再帰',
        ],
        answer: `def flatten_dict(d, prefix=""):
    result = {}
    for key, value in d.items():
        new_key = f"{prefix}_{key}" if prefix else key
        if isinstance(value, dict):
            result.update(flatten_dict(value, new_key))
        else:
            result[new_key] = value
    return result

# テスト
data = {"user": {"name": "田中", "address": {"city": "東京", "zip": "100-0001"}}}
flat = flatten_dict(data)
print(flat)
# {'user_name': '田中', 'user_address_city': '東京', 'user_address_zip': '100-0001'}`,
        explanation: 'ネストされたJSONデータのフラット化は、データベースやCSVへの変換時に頻出するパターンです。再帰関数で処理するのが定石です。',
      },
      {
        id: 'q3',
        question: 'CSVのようなデータ（辞書のリスト）を受け取り、指定カラムで集計してレポート文字列を生成する関数 generate_report(data, group_by, sum_column) を作成してください。',
        hints: [
          'defaultdict で group_by キーごとに sum_column を集計',
          'ソートして見やすく整形',
        ],
        answer: `from collections import defaultdict

def generate_report(data, group_by, sum_column):
    groups = defaultdict(float)
    counts = defaultdict(int)
    for row in data:
        key = row[group_by]
        groups[key] += row[sum_column]
        counts[key] += 1

    lines = [f"=== {group_by}別 {sum_column} レポート ==="]
    total = 0
    for key in sorted(groups.keys()):
        lines.append(f"  {key}: {groups[key]:.0f} ({counts[key]}件)")
        total += groups[key]
    lines.append(f"  合計: {total:.0f}")
    return "\\n".join(lines)

# テスト
data = [
    {"category": "食品", "amount": 1200},
    {"category": "雑貨", "amount": 800},
    {"category": "食品", "amount": 1500},
    {"category": "雑貨", "amount": 600},
]
print(generate_report(data, "category", "amount"))`,
        explanation: 'レポート生成は実務で頻繁に行う作業です。group_byとsum_columnをパラメータ化することで汎用的な関数になります。',
      },
    ],
    summary: [
      'リスト内包表記でフィルタ+変換（JavaのStream APIに相当）',
      'defaultdict(list)でグルーピング（SQLのGROUP BY相当）',
      '再帰関数でネスト構造のフラット化',
      'データパイプライン: 入力→フィルタ→変換→集計→出力',
      'レポート生成: 集計結果を文字列で整形',
    ],
  },
  {
    day: 14,
    week: 3,
    title: 'スクリプト作成',
    description: 'argparse、ログ出力(logging)、定期実行の考え方を学びます。',
    lessons: [
      {
        title: 'argparse',
        points: [
          'argparse: コマンドライン引数の解析（Spring Bootのargs処理に相当）',
          'add_argument(): 引数の定義（型、必須、デフォルト値、ヘルプ文）',
          '--verbose のようなフラグ引数も簡単に定義可能',
        ],
        comparisons: [
          {
            title: 'コマンドライン引数',
            java: `// Java (Spring Boot)
@SpringBootApplication
public class App implements CommandLineRunner {
    @Value("\${input.file}")
    private String inputFile;

    @Override
    public void run(String... args) {
        // args[0], args[1]... で引数取得
    }
}`,
            python: `# Python: argparse
import argparse

parser = argparse.ArgumentParser(description="データ処理ツール")
parser.add_argument("input", help="入力ファイルパス")
parser.add_argument("-o", "--output", default="out.csv", help="出力先")
parser.add_argument("-v", "--verbose", action="store_true")
args = parser.parse_args()

print(f"入力: {args.input}, 出力: {args.output}")`,
          },
        ],
      },
      {
        title: 'logging',
        points: [
          'logging: 標準のログ出力モジュール（Log4j/SLF4Jに相当）',
          'DEBUG, INFO, WARNING, ERROR, CRITICAL の5レベル',
          'basicConfig(): フォーマットやレベルの設定',
          'print()ではなくlogging.info()を使うのが実務の作法',
        ],
        comparisons: [
          {
            title: 'ログ出力',
            java: `// Java (SLF4J)
private static final Logger logger =
    LoggerFactory.getLogger(MyClass.class);
logger.info("処理開始: {}", filename);
logger.error("エラー発生", exception);`,
            python: `# Python: logging
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

logger.info("処理開始: %s", filename)
logger.error("エラー発生: %s", str(e))`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'argparseを使って、ファイル名（必須）、出力形式（-f/--format、デフォルト"csv"）、詳細モード（-v/--verbose）を受け取るスクリプトの雛形を作成してください。ヘルプメッセージも設定すること。',
        hints: [
          'add_argument の第1引数が位置引数（必須）',
          '-f/--format のようにハイフン付きはオプション引数',
          'action="store_true" でフラグ（True/False）引数',
        ],
        answer: `import argparse

def main():
    parser = argparse.ArgumentParser(description="データ変換ツール")
    parser.add_argument("filename", help="入力ファイルパス")
    parser.add_argument("-f", "--format", default="csv",
                        choices=["csv", "json", "tsv"],
                        help="出力形式 (default: csv)")
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="詳細ログを出力")
    args = parser.parse_args()

    print(f"入力ファイル: {args.filename}")
    print(f"出力形式: {args.format}")
    print(f"詳細モード: {args.verbose}")

if __name__ == "__main__":
    main()`,
        explanation: 'if __name__ == "__main__": はJavaのpublic static void mainに相当します。argparseは自動でヘルプ(-h)とエラー処理を生成してくれます。',
      },
      {
        id: 'q2',
        question: 'loggingモジュールを使って、ログをコンソールとファイルの両方に出力する設定を作成してください。コンソールはINFO以上、ファイルはDEBUG以上を記録すること。',
        hints: [
          'logging.getLogger() でルートロガーを取得',
          'StreamHandler: コンソール出力、FileHandler: ファイル出力',
          '各ハンドラにsetLevel()で異なるレベルを設定',
        ],
        answer: `import logging

def setup_logging(log_file="app.log"):
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(message)s"
    )

    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    console.setFormatter(formatter)

    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)

    logger.addHandler(console)
    logger.addHandler(file_handler)
    return logger

logger = setup_logging()
logger.debug("デバッグ情報（ファイルのみ）")
logger.info("処理を開始しました")
logger.warning("注意: データが空です")
logger.error("エラーが発生しました")`,
        explanation: 'ハンドラごとにログレベルを分けるパターンは実務でよく使います。開発中はDEBUGまでファイルに記録し、コンソールにはINFO以上だけ表示する構成が一般的です。',
      },
      {
        id: 'q3',
        question: 'argparseとloggingを組み合わせて、コマンドライン引数で--log-levelを指定できるスクリプトの雛形を作成してください。',
        hints: [
          'choices=["DEBUG","INFO","WARNING","ERROR"]',
          'getattr(logging, args.log_level) でレベル定数を取得',
        ],
        answer: `import argparse
import logging

def main():
    parser = argparse.ArgumentParser(description="ログレベル設定可能スクリプト")
    parser.add_argument("--log-level", default="INFO",
                        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
                        help="ログレベル (default: INFO)")
    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="%(asctime)s [%(levelname)s] %(message)s"
    )
    logger = logging.getLogger(__name__)

    logger.debug("デバッグ情報")
    logger.info("処理を開始")
    logger.warning("警告メッセージ")

if __name__ == "__main__":
    main()`,
        explanation: 'getattr(logging, "INFO")はlogging.INFOと同じ値(20)を返します。文字列からPythonオブジェクトの属性にアクセスするテクニックです。',
      },
    ],
    summary: [
      'argparse: コマンドライン引数の定義と解析',
      'if __name__ == "__main__": Javaのmainメソッドに相当',
      'logging: print()ではなくlogging.info()を使う',
      '5つのログレベル: DEBUG < INFO < WARNING < ERROR < CRITICAL',
      'ハンドラ: コンソールとファイルに異なるレベルで出力可能',
    ],
  },
  {
    day: 15,
    week: 3,
    title: 'テスト基礎',
    description: 'unittest、pytest、モック（Java JUnit経験を活かす）を学びます。',
    lessons: [
      {
        title: 'pytest基礎',
        points: [
          'pytest: Pythonで最も使われるテストフレームワーク',
          'test_ で始まる関数がテストケース（JUnitの@Test相当）',
          'assert文でアサーション（JUnitのassertEquals相当）',
          'fixtureでテストデータのセットアップ（JUnitの@Before相当）',
        ],
        comparisons: [
          {
            title: 'テストの比較',
            java: `// Java (JUnit)
@Test
public void testAdd() {
    Calculator calc = new Calculator();
    assertEquals(5, calc.add(2, 3));
}

@Before
public void setUp() {
    this.calc = new Calculator();
}`,
            python: `# Python (pytest)
def test_add():
    calc = Calculator()
    assert calc.add(2, 3) == 5

# フィクスチャ
import pytest

@pytest.fixture
def calc():
    return Calculator()

def test_add_with_fixture(calc):
    assert calc.add(2, 3) == 5`,
          },
        ],
      },
      {
        title: 'モック',
        points: [
          'unittest.mock: テストダブル作成（MockitoのMockに相当）',
          'patch(): 外部依存をモックに差し替え',
          'MagicMock: 自動的にメソッドやプロパティを生成',
        ],
        comparisons: [
          {
            title: 'モック',
            java: `// Java (Mockito)
@Mock
private ApiClient mockClient;

@Test
public void testFetch() {
    when(mockClient.get("/users"))
        .thenReturn(List.of(new User("田中")));
    List<User> result = service.getUsers();
    assertEquals(1, result.size());
}`,
            python: `# Python (unittest.mock)
from unittest.mock import patch, MagicMock

@patch("mymodule.requests.get")
def test_fetch(mock_get):
    mock_get.return_value.json.return_value = [{"name": "田中"}]
    mock_get.return_value.status_code = 200
    result = fetch_users()
    assert len(result) == 1`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '以下のcalculator関数のテストをpytestスタイルで書いてください。正常系と異常系（ゼロ除算）の両方をテストすること。\ndef calculator(a, b, op):\n  if op == "+": return a + b\n  if op == "-": return a - b\n  if op == "*": return a * b\n  if op == "/": \n    if b == 0: raise ValueError("ゼロ除算")\n    return a / b\n  raise ValueError(f"未知の演算子: {op}")',
        hints: [
          'assert calculator(2, 3, "+") == 5 のように書く',
          'pytest.raises(ValueError) で例外をテスト',
          '複数のテストケースをパラメータ化できます',
        ],
        answer: `import pytest

def calculator(a, b, op):
    if op == "+": return a + b
    if op == "-": return a - b
    if op == "*": return a * b
    if op == "/":
        if b == 0: raise ValueError("ゼロ除算")
        return a / b
    raise ValueError(f"未知の演算子: {op}")

def test_add():
    assert calculator(2, 3, "+") == 5

def test_subtract():
    assert calculator(10, 3, "-") == 7

def test_multiply():
    assert calculator(4, 5, "*") == 20

def test_divide():
    assert calculator(10, 2, "/") == 5.0

def test_divide_by_zero():
    with pytest.raises(ValueError, match="ゼロ除算"):
        calculator(10, 0, "/")

def test_unknown_operator():
    with pytest.raises(ValueError, match="未知の演算子"):
        calculator(1, 2, "%")`,
        explanation: 'pytest.raises()はJUnitのassertThrows()に相当します。matchパラメータで例外メッセージも検証できます。',
      },
      {
        id: 'q2',
        question: '@pytest.fixtureを使って、テスト用のサンプルデータ（ユーザーリスト）を作成し、フィルタリング関数のテストを書いてください。',
        hints: [
          '@pytest.fixture でテストデータを用意',
          'テスト関数の引数にフィクスチャ名を書く',
        ],
        answer: `import pytest

def filter_adults(users):
    return [u for u in users if u["age"] >= 20]

@pytest.fixture
def sample_users():
    return [
        {"name": "田中", "age": 30},
        {"name": "鈴木", "age": 17},
        {"name": "佐藤", "age": 25},
        {"name": "山田", "age": 15},
    ]

def test_filter_adults(sample_users):
    result = filter_adults(sample_users)
    assert len(result) == 2
    assert all(u["age"] >= 20 for u in result)

def test_filter_adults_empty():
    result = filter_adults([])
    assert result == []

def test_filter_adults_all_minor():
    minors = [{"name": "A", "age": 10}, {"name": "B", "age": 15}]
    result = filter_adults(minors)
    assert result == []`,
        explanation: '@pytest.fixtureは@Beforeに相当しますが、より柔軟です。テスト関数の引数名と一致するフィクスチャが自動的に注入されます。',
      },
      {
        id: 'q3',
        question: 'unittest.mockのpatchを使って、APIクライアントの外部呼び出しをモックし、正常レスポンスとエラーレスポンスの両方をテストしてください。',
        hints: [
          '@patch("__main__.requests.get") でrequests.getをモック',
          'mock_get.return_value.status_code = 200 で戻り値設定',
          '別テストで status_code = 500 のケースもテスト',
        ],
        answer: `from unittest.mock import patch, MagicMock

def fetch_user_names(url):
    import requests
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        return []
    return [u["name"] for u in response.json()]

@patch("__main__.requests.get")
def test_fetch_success(mock_get):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = [
        {"name": "田中"}, {"name": "鈴木"}
    ]
    result = fetch_user_names("https://api.example.com/users")
    assert result == ["田中", "鈴木"]
    mock_get.assert_called_once()

@patch("__main__.requests.get")
def test_fetch_error(mock_get):
    mock_get.return_value.status_code = 500
    result = fetch_user_names("https://api.example.com/users")
    assert result == []`,
        explanation: 'patchデコレータはMockitoの@Mockに相当します。外部APIへの実際の通信を行わずにテストできるため、テストが高速で安定します。',
      },
    ],
    summary: [
      'pytest: test_で始まる関数がテスト（JUnitの@Test相当）',
      'assert: 等価比較（JUnitのassertEquals相当）',
      'pytest.raises(): 例外テスト（JUnitのassertThrows相当）',
      '@pytest.fixture: テストデータのセットアップ（@Before相当）',
      'unittest.mock.patch: 外部依存のモック（Mockito相当）',
    ],
  },

  // ============================================================
  // Week 4: 実践演習
  // ============================================================
  {
    day: 16,
    week: 4,
    title: '総合演習① CSVデータ集計',
    description: 'CSVデータ集計スクリプトを段階的に作成します。',
    lessons: [
      {
        title: '演習の概要',
        points: [
          'これまで学んだcsv、collections、argparse、loggingを組み合わせます',
          'CSVファイルを読み込み→フィルタ→集計→レポート出力の流れ',
          '実務でよくある「データ集計バッチ」のパターンを体験',
        ],
        comparisons: [
          {
            title: 'バッチ処理の構成',
            java: `// Java: Spring Batchのような構成
@Component
public class DataProcessor {
    public void process(String inputPath) {
        List<Record> data = readCsv(inputPath);
        List<Record> filtered = filter(data);
        Map<String, Summary> summary = aggregate(filtered);
        writeReport(summary);
    }
}`,
            python: `# Python: スクリプトで簡潔に
import csv
from collections import Counter, defaultdict

def process(input_path, output_path):
    with open(input_path, encoding="utf-8") as f:
        data = list(csv.DictReader(f))
    filtered = [r for r in data if int(r["amount"]) > 0]
    summary = aggregate(filtered)
    write_report(summary, output_path)`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'CSV文字列データを読み込み、部門別の売上合計を計算する関数を作成してください。\nCSV: "dept,product,amount\\n開発,PC,50000\\n営業,PC,30000\\n開発,モニター,20000\\n営業,電話,10000\\n開発,キーボード,5000"',
        hints: [
          'io.StringIO + csv.DictReader で文字列から読み込み',
          'defaultdict(int) で部門別集計',
        ],
        answer: `import csv
import io
from collections import defaultdict

def aggregate_by_dept(csv_data):
    reader = csv.DictReader(io.StringIO(csv_data))
    totals = defaultdict(int)
    for row in reader:
        totals[row["dept"]] += int(row["amount"])
    return dict(totals)

csv_data = """dept,product,amount
開発,PC,50000
営業,PC,30000
開発,モニター,20000
営業,電話,10000
開発,キーボード,5000"""

result = aggregate_by_dept(csv_data)
for dept, total in sorted(result.items()):
    print(f"{dept}: ¥{total:,}")`,
        explanation: 'defaultdict(int)は初期値が0の辞書で、カウントや合計の集計に最適です。:, フォーマットで3桁区切り表示ができます。',
      },
      {
        id: 'q2',
        question: '問題1の結果を使って、売上合計の多い順にランキングし、棒グラフ風のテキストレポートを生成する関数を作成してください。\n例: "開発 |████████████████| ¥75,000"',
        hints: [
          'sorted(items, key=lambda x: x[1], reverse=True) で降順ソート',
          '"█" * (amount // scale) でバーを表現',
          '最大値に合わせてスケールを決める',
        ],
        answer: `def text_bar_chart(data, bar_width=20):
    sorted_data = sorted(data.items(), key=lambda x: x[1], reverse=True)
    max_val = max(data.values())
    lines = []
    for dept, total in sorted_data:
        bar_len = int(total / max_val * bar_width)
        bar = "█" * bar_len
        lines.append(f"{dept:　<4} |{bar:<{bar_width}}| ¥{total:>10,}")
    return "\\n".join(lines)

data = {"開発": 75000, "営業": 40000, "人事": 15000}
print(text_bar_chart(data))`,
        explanation: 'テキストベースの可視化は、CLIツールやログ出力でデータを素早く確認するのに便利です。',
      },
      {
        id: 'q3',
        question: 'argparseとloggingを組み合わせて、CSV集計スクリプトの完成版を作成してください。コマンドライン引数：入力ファイル（必須）、集計キー（--key、デフォルト"dept"）、出力形式（--format、csv/text選択）。',
        hints: [
          '問題1と2の関数を組み合わせる',
          'argparse でコマンドライン引数を定義',
          'logging で処理状況を出力',
        ],
        answer: `import argparse
import csv
import logging
from collections import defaultdict

def setup_logging():
    logging.basicConfig(level=logging.INFO,
                       format="%(asctime)s [%(levelname)s] %(message)s")

def aggregate(data, key, value_col="amount"):
    totals = defaultdict(int)
    for row in data:
        totals[row[key]] += int(row[value_col])
    return dict(totals)

def main():
    parser = argparse.ArgumentParser(description="CSV集計ツール")
    parser.add_argument("input", help="入力CSVファイル")
    parser.add_argument("--key", default="dept", help="集計キー")
    parser.add_argument("--format", choices=["csv", "text"], default="text")
    args = parser.parse_args()

    setup_logging()
    logger = logging.getLogger(__name__)
    logger.info(f"処理開始: {args.input}")

    # ここでは文字列データで代用
    logger.info(f"集計キー: {args.key}, 出力形式: {args.format}")
    logger.info("処理完了")

if __name__ == "__main__":
    main()`,
        explanation: '実務のPythonスクリプトは「argparse + logging + メイン処理関数」の3点セットで構成されることが多いです。',
      },
    ],
    summary: [
      'CSVデータ集計: DictReader → defaultdictで集計 → レポート出力',
      'テキスト可視化: "█" 文字で簡易棒グラフ',
      'スクリプト構成: argparse + logging + main()関数',
      'if __name__ == "__main__": スクリプトのエントリポイント',
    ],
  },
  {
    day: 17,
    week: 4,
    title: '総合演習② API連携+データ変換',
    description: 'REST API連携＋データ変換パイプラインを作成します。',
    lessons: [
      {
        title: '演習の概要',
        points: [
          'APIからデータ取得→変換→フィルタ→別の形式で出力',
          'エラーハンドリングとリトライを含む堅牢な設計',
          '実務のETL（Extract-Transform-Load）パターンの簡易版',
        ],
        comparisons: [
          {
            title: 'ETLパイプライン',
            java: `// Java: 複数クラスに分散しがち
@Service
public class DataPipeline {
    @Autowired
    private ApiClient apiClient;
    @Autowired
    private DataTransformer transformer;
    @Autowired
    private ReportWriter writer;
}`,
            python: `# Python: 関数ベースでシンプルに
def pipeline(api_url, output_path):
    raw_data = extract(api_url)    # APIから取得
    transformed = transform(raw_data)  # 変換
    load(transformed, output_path)  # 出力`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'JSONPlaceholder API (https://jsonplaceholder.typicode.com) を使って、/users エンドポイントからユーザー一覧を取得し、name, email, company.name だけを抽出した辞書のリストに変換する関数を作成してください。',
        hints: [
          'requests.get() でAPIコール',
          'ネストされた辞書から値を取得: user["company"]["name"]',
          'リスト内包表記で変換',
        ],
        answer: `import requests

def fetch_and_transform_users():
    response = requests.get(
        "https://jsonplaceholder.typicode.com/users",
        timeout=10
    )
    response.raise_for_status()
    users = response.json()

    return [
        {
            "name": u["name"],
            "email": u["email"],
            "company": u["company"]["name"]
        }
        for u in users
    ]

# 使用例（APIアクセスが必要）
# result = fetch_and_transform_users()
# for user in result:
#     print(f"{user['name']} ({user['email']}) - {user['company']}")`,
        explanation: 'ネストされたJSONからフラットな構造への変換は、API連携の基本パターンです。',
      },
      {
        id: 'q2',
        question: '問題1の結果をCSVファイルに出力する関数と、JSON形式で出力する関数を作成してください。出力形式を引数で切り替えられるようにすること。',
        hints: [
          'csv.DictWriter で辞書のリストをCSVに出力',
          'json.dump で辞書のリストをJSONに出力',
          '引数 format で "csv" か "json" を指定',
        ],
        answer: `import csv
import json

def save_data(data, output_path, fmt="csv"):
    if fmt == "csv":
        if not data:
            return
        with open(output_path, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
    elif fmt == "json":
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"{fmt.upper()}ファイルを保存: {output_path}")

# テスト用データ
test_data = [
    {"name": "田中", "email": "tanaka@test.com", "company": "ABC社"},
    {"name": "鈴木", "email": "suzuki@test.com", "company": "XYZ社"},
]
save_data(test_data, "users.csv", "csv")
save_data(test_data, "users.json", "json")`,
        explanation: '出力形式を引数で切り替えるパターンは、汎用的なデータ処理ツールでよく使います。',
      },
      {
        id: 'q3',
        question: 'Extract（取得）→ Transform（変換）→ Load（出力）の3段階パイプラインを関数で構成し、メイン関数から呼び出すスクリプトを完成させてください。各段階でloggingを使ってログ出力すること。',
        hints: [
          '各段階を独立した関数として定義',
          'main()で3つの関数を順番に呼び出す',
          'loggingで各段階の開始・完了をログ出力',
        ],
        answer: `import json
import logging

logging.basicConfig(level=logging.INFO,
                   format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

def extract(source):
    logger.info(f"データ取得開始: {source}")
    # APIコールの代わりにサンプルデータ
    data = [
        {"id": 1, "name": "田中", "score": 85, "dept": "開発"},
        {"id": 2, "name": "鈴木", "score": 72, "dept": "営業"},
        {"id": 3, "name": "佐藤", "score": 91, "dept": "開発"},
    ]
    logger.info(f"{len(data)}件取得完了")
    return data

def transform(data, min_score=0):
    logger.info(f"データ変換開始 (フィルタ: score >= {min_score})")
    result = [
        {"name": d["name"], "dept": d["dept"], "grade": "A" if d["score"] >= 80 else "B"}
        for d in data if d["score"] >= min_score
    ]
    logger.info(f"{len(data)}件 → {len(result)}件")
    return result

def load(data, output_path):
    logger.info(f"データ出力開始: {output_path}")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    logger.info("出力完了")

def main():
    raw = extract("https://api.example.com/users")
    transformed = transform(raw, min_score=75)
    load(transformed, "output.json")

if __name__ == "__main__":
    main()`,
        explanation: 'ETLパイプラインの各段階を関数として分離すると、テストや再利用がしやすくなります。loggingで処理状況を可視化することで、運用時のトラブルシューティングが容易になります。',
      },
    ],
    summary: [
      'ETLパターン: Extract(取得) → Transform(変換) → Load(出力)',
      'APIレスポンスのフラット化: ネストJSONから必要なフィールドを抽出',
      '出力形式の切り替え: CSV/JSON を引数で制御',
      'logging: 各処理段階の開始・完了をログ出力',
    ],
  },
  {
    day: 18,
    week: 4,
    title: '総合演習③ ファイル自動整理ツール',
    description: 'ファイル自動整理ツールを作成します。',
    lessons: [
      {
        title: '演習の概要',
        points: [
          'pathlib でディレクトリ内のファイルを走査',
          '拡張子やファイル名パターンでファイルを分類',
          '日付別・種類別にフォルダを自動作成してファイルを整理',
        ],
        comparisons: [
          {
            title: 'ファイル操作',
            java: `// Java: Files API
Files.walk(Paths.get(dir))
    .filter(Files::isRegularFile)
    .forEach(path -> {
        String ext = getExtension(path);
        // 分類処理
    });`,
            python: `# Python: pathlib
from pathlib import Path

for path in Path(dir).iterdir():
    if path.is_file():
        ext = path.suffix  # ".txt"
        # 分類処理`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '指定ディレクトリ内のファイルを拡張子ごとに分類して、{"txt": ["a.txt", "b.txt"], "py": ["main.py"]} のような辞書を返す関数 classify_files(directory) を作成してください。',
        hints: [
          'Path(directory).iterdir() でファイル一覧',
          'path.suffix で拡張子取得（.付き）',
          'defaultdict(list) でグルーピング',
        ],
        answer: `from pathlib import Path
from collections import defaultdict

def classify_files(directory):
    classified = defaultdict(list)
    for path in Path(directory).iterdir():
        if path.is_file():
            ext = path.suffix.lstrip(".") or "no_ext"
            classified[ext].append(path.name)
    return dict(classified)

# テスト（カレントディレクトリで実行）
result = classify_files(".")
for ext, files in sorted(result.items()):
    print(f".{ext}: {len(files)}ファイル → {files[:3]}...")`,
        explanation: 'path.suffixは".txt"のようにドット付きで返すので、lstrip(".")で除去しています。拡張子なしのファイルも考慮しています。',
      },
      {
        id: 'q2',
        question: 'ファイルの更新日時を取得し、「YYYY-MM」形式の月別フォルダに移動する計画を立てる関数（実際には移動せず、移動先パスを返す）を作成してください。',
        hints: [
          'path.stat().st_mtime でUNIXタイムスタンプ取得',
          'datetime.fromtimestamp() で日時に変換',
          '移動先: base_dir / "2024-01" / filename',
        ],
        answer: `from pathlib import Path
from datetime import datetime

def plan_organize_by_date(directory):
    plan = []
    for path in Path(directory).iterdir():
        if path.is_file():
            mtime = datetime.fromtimestamp(path.stat().st_mtime)
            month_dir = mtime.strftime("%Y-%m")
            dest = Path(directory) / month_dir / path.name
            plan.append({"source": str(path), "dest": str(dest), "date": month_dir})
    return plan

# テスト
plan = plan_organize_by_date(".")
for item in plan[:5]:
    print(f"{item['source']} → {item['dest']}")`,
        explanation: '実際にファイルを移動する前に、計画（plan）を作成して確認するパターンは、破壊的な操作を行う前のベストプラクティスです。',
      },
      {
        id: 'q3',
        question: 'ドライラン機能付きのファイル整理関数 organize_files(directory, dry_run=True) を作成してください。dry_run=Trueの場合は移動計画の表示のみ、Falseの場合は実際にディレクトリ作成とファイル移動を行ってください。',
        hints: [
          'Path.mkdir(parents=True, exist_ok=True) でディレクトリ作成',
          'shutil.move() でファイル移動',
          'dry_runフラグで実行有無を制御',
        ],
        answer: `from pathlib import Path
from datetime import datetime
import shutil
import logging

logger = logging.getLogger(__name__)

def organize_files(directory, dry_run=True):
    base = Path(directory)
    moved = 0

    for path in base.iterdir():
        if not path.is_file():
            continue

        ext = path.suffix.lstrip(".") or "other"
        dest_dir = base / ext
        dest = dest_dir / path.name

        if dry_run:
            print(f"[DRY RUN] {path.name} → {ext}/")
        else:
            dest_dir.mkdir(exist_ok=True)
            shutil.move(str(path), str(dest))
            logger.info(f"移動: {path.name} → {ext}/")
        moved += 1

    mode = "DRY RUN" if dry_run else "実行"
    print(f"\\n[{mode}] {moved}ファイルを処理")

# テスト（dry_run=Trueで安全に確認）
# organize_files("./test_dir", dry_run=True)`,
        explanation: 'dry_runパターンは、ファイル操作やデータ変更など取り消しが難しい処理で非常に重要です。まず計画を見て確認してから実行できます。',
      },
    ],
    summary: [
      'pathlib: ファイル走査・分類の基本（iterdir, glob, suffix）',
      'ファイルメタデータ: stat().st_mtime で更新日時取得',
      'dry_runパターン: 破壊的操作前に計画を確認',
      'shutil.move(): ファイルの移動',
      'mkdir(parents=True, exist_ok=True): 安全なディレクトリ作成',
    ],
  },
  {
    day: 19,
    week: 4,
    title: '総合演習④ Webhook通知スクリプト',
    description: '簡易Slackbot / Webhook通知スクリプトを作成します。',
    lessons: [
      {
        title: '演習の概要',
        points: [
          'Webhookは外部サービスにHTTP POSTで通知を送る仕組み',
          'Slack/Teams/Discordなど多くのサービスがWebhookをサポート',
          '定期実行はcron（Linux）やタスクスケジューラ（Windows）で行う',
        ],
        comparisons: [
          {
            title: 'Webhook通知',
            java: `// Java (Spring)
@Scheduled(fixedRate = 3600000)
public void healthCheck() {
    restTemplate.postForEntity(webhookUrl,
        new HttpEntity<>(payload), String.class);
}`,
            python: `# Python
import requests
from datetime import datetime

def send_slack_notification(webhook_url, message):
    payload = {"text": message}
    response = requests.post(webhook_url, json=payload)
    return response.status_code == 200`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: 'Slack風のWebhook通知関数を作成してください。メッセージ、レベル（info/warning/error）、タイムスタンプを含むペイロードを構築し、POSTリクエストを送信する関数を書いてください。実際のURLは不要で、構築したペイロードを返すだけでOKです。',
        hints: [
          'レベルに応じてアイコンを変える（ℹ️ ⚠️ 🚨）',
          'datetime.now().isoformat() でタイムスタンプ',
        ],
        answer: `from datetime import datetime

def build_notification(message, level="info"):
    icons = {"info": "ℹ️", "warning": "⚠️", "error": "🚨"}
    icon = icons.get(level, "ℹ️")
    payload = {
        "text": f"{icon} [{level.upper()}] {message}",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"{icon} *[{level.upper()}]* {message}"
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": f"送信時刻: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
                    }
                ]
            }
        ]
    }
    return payload

# テスト
import json
payload = build_notification("デプロイが完了しました", "info")
print(json.dumps(payload, ensure_ascii=False, indent=2))`,
        explanation: 'Slack Webhook APIのBlock Kit形式でペイロードを構築しています。レベルに応じたアイコンで視認性を高めています。',
      },
      {
        id: 'q2',
        question: '複数のWebhook URLに通知を一括送信する関数を作成してください。各URLへの送信結果（成功/失敗）をまとめてレポートする機能も付けてください。',
        hints: [
          'URLのリストをループで処理',
          '各URLの送信結果を辞書に記録',
          'try-exceptで個別のエラーをキャッチ',
        ],
        answer: `import requests
from datetime import datetime

def broadcast_notification(urls, message, level="info"):
    results = []
    for url in urls:
        payload = {
            "text": f"[{level.upper()}] {message}",
            "timestamp": datetime.now().isoformat()
        }
        try:
            response = requests.post(url, json=payload, timeout=5)
            results.append({
                "url": url[:50] + "...",
                "status": response.status_code,
                "success": response.status_code == 200
            })
        except requests.RequestException as e:
            results.append({
                "url": url[:50] + "...",
                "status": 0,
                "success": False,
                "error": str(e)
            })

    success_count = sum(1 for r in results if r["success"])
    print(f"送信結果: {success_count}/{len(urls)} 成功")
    return results

# テスト（実際のURLなしでロジック確認）
# broadcast_notification(["https://hooks.slack.com/xxx"], "テスト通知")`,
        explanation: '複数サービスへの一括通知では、1つの失敗が全体を止めないよう個別にtry-exceptで囲むことが重要です。',
      },
      {
        id: 'q3',
        question: 'システムの健全性チェック（ヘルスチェック）を行い、異常があればWebhook通知を送る関数を作成してください。チェック項目：ディスク使用率、メモリ使用率（ダミーデータでOK）、API疎通（URLリストへのGET）。',
        hints: [
          '各チェック項目を関数として分離',
          '閾値を超えたらwarning/errorレベルで通知',
          '全チェック結果をまとめてレポート',
        ],
        answer: `from datetime import datetime
import json

def check_disk():
    usage = 75  # ダミーデータ
    return {"name": "ディスク使用率", "value": f"{usage}%",
            "status": "ok" if usage < 80 else "warning" if usage < 90 else "error"}

def check_memory():
    usage = 85  # ダミーデータ
    return {"name": "メモリ使用率", "value": f"{usage}%",
            "status": "ok" if usage < 70 else "warning" if usage < 90 else "error"}

def check_api(url):
    return {"name": f"API: {url}", "value": "200 OK",
            "status": "ok"}  # ダミーで常にOK

def health_check():
    checks = [check_disk(), check_memory()]
    checks.append(check_api("https://api.example.com"))

    issues = [c for c in checks if c["status"] != "ok"]

    report = {
        "timestamp": datetime.now().isoformat(),
        "total_checks": len(checks),
        "issues": len(issues),
        "details": checks
    }

    if issues:
        worst = "error" if any(c["status"] == "error" for c in issues) else "warning"
        msg = f"ヘルスチェック: {len(issues)}件の問題検出\\n"
        for issue in issues:
            msg += f"  - {issue['name']}: {issue['value']} ({issue['status']})\\n"
        print(f"[{worst.upper()}] {msg}")
    else:
        print("[OK] 全チェック正常")

    return report

result = health_check()
print(json.dumps(result, ensure_ascii=False, indent=2))`,
        explanation: 'ヘルスチェックは各項目を独立した関数にすることで、拡張が容易になります。結果を構造化データ（辞書）で返すことで、Webhook送信やログ記録に再利用できます。',
      },
    ],
    summary: [
      'Webhook: HTTP POSTで外部サービスに通知する仕組み',
      'ペイロード構築: 辞書→json引数でJSON送信',
      '一括送信: 個別のtry-exceptで1件の失敗が全体を止めない設計',
      'ヘルスチェック: チェック項目を関数化して拡張しやすく',
    ],
  },
  {
    day: 20,
    week: 4,
    title: 'まとめ・実務Tips',
    description: 'ベストプラクティス、仮想環境、コードスタイル、次のステップ。',
    lessons: [
      {
        title: '実務で使えるPython Tips',
        points: [
          'venv: 仮想環境で依存パッケージを分離（JavaのMaven/Gradleに相当）',
          'pip freeze > requirements.txt: 依存関係の記録',
          'PEP 8: コードスタイルガイド（変数名はsnake_case）',
          'Type Hints: 型ヒントでIDEの補完と安全性を向上',
        ],
        comparisons: [
          {
            title: '環境管理',
            java: `// Java: Maven/Gradle
// pom.xml / build.gradle で依存管理
// JDKバージョン管理

// Javaの命名規則
public class MyService {      // PascalCase
    private int itemCount;     // camelCase
    public void processData() {} // camelCase
}`,
            python: `# Python: venv + pip
# python -m venv .venv
# source .venv/bin/activate  (Mac/Linux)
# pip install requests
# pip freeze > requirements.txt

# PEP 8 命名規則
class MyService:         # PascalCase (クラス)
    item_count = 0       # snake_case (変数)
    def process_data(self):  # snake_case (関数)
        MAX_RETRY = 3    # UPPER_CASE (定数)`,
          },
        ],
      },
      {
        title: '次のステップ',
        points: [
          'pandas: データ分析ライブラリ（Excel操作の自動化にも最適）',
          'FastAPI: モダンなAPI開発フレームワーク',
          'SQLAlchemy: データベースORM（JPAに相当）',
          'Jupyter Notebook: データ分析・可視化の定番ツール',
          'ローコード連携: Pythonスクリプトを外部ツールから呼び出す方法',
        ],
        comparisons: [
          {
            title: 'Java → Python 対応表',
            java: `// Java/Spring エコシステム
Spring Boot    → FastAPI / Flask
JPA/Hibernate  → SQLAlchemy
Maven/Gradle   → pip + venv
JUnit          → pytest
Log4j/SLF4J    → logging
Jackson        → json (標準)
Apache POI     → openpyxl / pandas`,
            python: `# Python エコシステム
# Web API:     FastAPI (非同期), Flask (シンプル)
# ORM:         SQLAlchemy, Django ORM
# パッケージ:   pip, poetry, uv
# テスト:       pytest (デファクト)
# ログ:         logging (標準)
# JSON:         json (標準)
# Excel:        openpyxl, pandas`,
          },
        ],
      },
    ],
    problems: [
      {
        id: 'q1',
        question: '型ヒント付きの関数を3つ作成してください。(1) 文字列リストを受け取り辞書のリストを返す関数 (2) Optional型を使った関数 (3) ジェネリクスを使った汎用関数。',
        hints: [
          'from typing import Optional, TypeVar, List で型をインポート',
          '-> で戻り値の型を指定',
          'Optional[str] は str | None の意味',
        ],
        answer: `from typing import Optional

def parse_csv_line(fields: list[str]) -> list[dict[str, str]]:
    """CSVの行をパースして辞書のリストを返す"""
    headers = fields[0].split(",")
    return [
        dict(zip(headers, line.split(",")))
        for line in fields[1:]
    ]

def find_user(users: list[dict], name: str) -> Optional[dict]:
    """名前でユーザーを検索。見つからなければNone"""
    for user in users:
        if user.get("name") == name:
            return user
    return None

def first_or_default[T](items: list[T], default: T) -> T:
    """リストの最初の要素を返す。空なら default"""
    return items[0] if items else default

# テスト
lines = ["name,age", "田中,30", "鈴木,25"]
print(parse_csv_line(lines))

users = [{"name": "田中", "age": 30}]
print(find_user(users, "田中"))
print(find_user(users, "山田"))

print(first_or_default([1, 2, 3], 0))
print(first_or_default([], 0))`,
        explanation: '型ヒントはコードの可読性を高め、IDEの補完やmypyによる静的チェックを可能にします。JavaのGenericsに相当するTypeVarも使えます。',
      },
      {
        id: 'q2',
        question: 'これまでの学習で作成した関数を組み合わせて、「CSVデータを読み込み → フィルタリング → JSON出力 → 完了通知のペイロード作成」の一連のパイプラインを作成してください。',
        hints: [
          '各ステップを独立した関数として定義',
          'メイン関数から順番に呼び出す',
          'loggingで各ステップを記録',
        ],
        answer: `import csv
import io
import json
import logging
from datetime import datetime
from collections import defaultdict

logging.basicConfig(level=logging.INFO,
                   format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

def read_csv(csv_text: str) -> list[dict]:
    logger.info("CSV読み込み開始")
    reader = csv.DictReader(io.StringIO(csv_text))
    data = list(reader)
    logger.info(f"{len(data)}件のデータを読み込み")
    return data

def filter_data(data: list[dict], min_score: int) -> list[dict]:
    logger.info(f"フィルタリング: score >= {min_score}")
    result = [d for d in data if int(d["score"]) >= min_score]
    logger.info(f"{len(data)}件 → {len(result)}件")
    return result

def to_json(data: list[dict], output: str) -> str:
    logger.info(f"JSON出力: {output}")
    content = json.dumps(data, ensure_ascii=False, indent=2)
    logger.info(f"{len(content)} bytes")
    return content

def notify(message: str) -> dict:
    return {
        "text": f"✅ {message}",
        "timestamp": datetime.now().isoformat()
    }

def main():
    csv_data = """name,score,dept
田中,85,開発
鈴木,72,営業
佐藤,91,開発
山田,68,人事"""

    data = read_csv(csv_data)
    filtered = filter_data(data, 75)
    json_output = to_json(filtered, "output.json")
    notification = notify(f"処理完了: {len(filtered)}件のデータをJSON出力")

    print("\\n--- JSON出力 ---")
    print(json_output)
    print("\\n--- 通知ペイロード ---")
    print(json.dumps(notification, ensure_ascii=False, indent=2))

main()`,
        explanation: 'これがPythonスクリプトの実務的な構成です。各処理を関数に分離し、loggingで追跡可能にし、パイプラインとして組み立てます。',
      },
      {
        id: 'q3',
        question: 'Java→Python移行チートシートを辞書データとして作成し、ターミナルに見やすく表示する関数を作成してください。少なくとも15項目を含めること。',
        hints: [
          '辞書のリストでデータを構成',
          'f-stringの幅指定で整形表示',
        ],
        answer: `def print_cheatsheet():
    items = [
        ("型宣言", "int x = 10;", "x = 10"),
        ("出力", "System.out.println()", "print()"),
        ("文字列結合", '"Hello " + name', 'f"Hello {name}"'),
        ("配列/リスト", "ArrayList<>", "list []"),
        ("辞書", "HashMap<>", "dict {}"),
        ("for文", "for(int i=0;i<n;i++)", "for i in range(n)"),
        ("拡張for", "for(var x : list)", "for x in list"),
        ("null", "null", "None"),
        ("try-catch", "try-catch-finally", "try-except-finally"),
        ("ラムダ", "x -> x * 2", "lambda x: x * 2"),
        ("クラス", "public class X {}", "class X:"),
        ("コンストラクタ", "public X() {}", "def __init__(self):"),
        ("this", "this.name", "self.name"),
        ("継承", "extends", "class Child(Parent)"),
        ("インタフェース", "implements", "ABC / Protocol"),
        ("パッケージ", "import com.x.Y", "import x / from x import Y"),
        ("テスト", "JUnit @Test", "pytest test_xxx()"),
        ("ビルド", "Maven/Gradle", "pip + venv"),
    ]

    print("=" * 65)
    print(f"{'概念':<12} {'Java':<22} {'Python':<22}")
    print("=" * 65)
    for concept, java, python in items:
        print(f"{concept:<12} {java:<22} {python:<22}")
    print("=" * 65)

print_cheatsheet()`,
        explanation: 'f-stringの幅指定（{var:<20}）で左揃え、整形表示ができます。このチートシートを手元に置いておけば、Java→Python変換が素早くできます。',
      },
    ],
    summary: [
      'venv + pip: 仮想環境とパッケージ管理',
      'PEP 8: snake_case（変数/関数）、PascalCase（クラス）',
      'Type Hints: 型ヒントでIDEサポートと可読性向上',
      '次のステップ: pandas, FastAPI, SQLAlchemy, Jupyter',
      'Java→Python対応: Spring→FastAPI, JPA→SQLAlchemy, Maven→pip',
      'この20日間で学んだことを実務に活かしていきましょう！',
    ],
  },
];
