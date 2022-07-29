console.log( `Executed at ${ new Date().toISOString() }` )

const Tree = (value, left, right) => (destructure, __) =>
  destructure(value, left, right);

const EmptyTree = () => (__, destructure) => destructure();

const myTree = Tree(
  22,
  Tree(
    9,
    Tree(4, EmptyTree(), EmptyTree()),
    Tree(12, EmptyTree(), EmptyTree())
  ),
  Tree(
    60,
    Tree(56, EmptyTree(), EmptyTree()),
    EmptyTree()
  )
);

const myRoot = myTree((value, left, right) => value, () => null);

const treeRoot = tree => tree((value, left, right) => value, () => null);
const treeLeft = tree => tree((value, left, right) => left, () => null);
const treeRight = tree => tree((value, left, right) => right, () => null);

const treeIsEmpty = tree => tree(() => false, () => true);

const treeCount = aTree => aTree(
  (value, left, right) => 1 + treeCount(left) + treeCount(right),
  () => 0
);
console.log(treeCount(myTree));

const treeToObject = tree =>
  tree((value, left, right) => {
    const leftBranch = treeToObject(left);
    const rightBranch = treeToObject(right);
    const result = { value };
    if (leftBranch) {
      result.left = leftBranch;
    }
    if (rightBranch) {
      result.right = rightBranch;
    }
    return result;
  }, () => null);
console.log(treeToObject(myTree));

const treeSearch = (findValue, tree) =>
  tree(
    (value, left, right) =>
      findValue === value
        ? true
        : findValue < value
          ? treeSearch(findValue, left)
          : treeSearch(findValue, right),
    () => false
  );

const treeInsert = (newValue, tree) =>
  tree(
    (value, left, right) =>
      newValue <= value
        ? Tree(value, treeInsert(newValue, left), right)
        : Tree(value, left, treeInsert(newValue, right)),
    () => Tree(newValue, EmptyTree(), EmptyTree())
  );

const compare = (obj1, obj2) =>
  obj1.key === obj2.key ? 0 : obj1.key < obj2.key ? -1 : 1;

const treeInsert2 = (comparator, newValue, tree) =>
  tree(
    (value, left, right) =>
      comparator(newValue, value) === 0
        ? Tree(newValue, left, right)
        : comparator(newValue, value) < 0
          ? Tree(
            value,
            treeInsert2(comparator, newValue, left),
            right
          )
          : Tree(
            value,
            left,
            treeInsert2(comparator, newValue, right)
          ),
    () => Tree(newValue, EmptyTree(), EmptyTree())
  );

const treeMap = (fn, tree) =>
  tree(
    (value, left, right) =>
      Tree(fn(value), treeMap(fn, left), treeMap(fn, right)),
    () => EmptyTree()
  );
