//
//  DevicesState.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

class DevicesState {
  
  var loading: Bool
  var adding: Bool
  var editing: Bool
  var error: String
  
  init?(data: [String: Any]) {
    guard
      let loading = data["loading"] as? Bool,
      let adding = data["adding"] as? Bool,
      let editing = data["editing"] as? Bool,
      let error = data["error"] as? String
      else { return nil }
    
    self.loading=loading
    self.adding=adding
    self.editing=editing
    self.error=error
  }
  
}
