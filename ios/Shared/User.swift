//
//  User.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 03-03-17.
//  . All rights reserved.
//

import Foundation

class User {
  
  var error: String
  var username: String
  var password: String
  var loading: Bool
  var rehydrated: Bool

  init?(data: [String: Any]) {
    guard
      let error = data["error"] as? String,
      let username = data["username"] as? String,
      let password = data["password"] as? String,
      let loading = data["loading"] as? Bool,
      let rehydrated = data["rehydrated"] as? Bool
      else {return nil}

    self.error = error
    self.username = username
    self.password = password
    self.loading = loading
    self.rehydrated = rehydrated
  }

}
