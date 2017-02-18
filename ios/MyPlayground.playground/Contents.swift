//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"

var count = 0

class Test2 {
  var active = false
}

class Test {
  var stuff: Test2? {
    didSet {
      count = count + 1
    }
  }
}

print(count, terminator: "")

let test = Test()
let test2 = Test2()


print(count, terminator: "")

test.stuff = test2

print(count, terminator: "")

test.stuff?.active = true

print(count, terminator: "")