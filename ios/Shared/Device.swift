//
//  Device.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 03-03-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

class Device {
  
  var mac: String
  var name: String
  var active: Bool
  var error: String
  var loading: Bool
  
  init?(data: [String: Any]) {
    guard
      let mac = data["mac"] as? String,
      let name = data["name"] as? String,
      let active = data["active"] as? Bool,
      let error = data["error"] as? String,
      let loading = data["loading"] as? Bool
      else { return nil }
    
    self.mac = mac.uppercased()
    self.name = name
    self.active = active
    self.error = error
    self.loading = loading
  }
  
}
