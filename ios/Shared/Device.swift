//
//  Device.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

class Device {

  let mac: String
  let name: String
  var active: Bool

  init(mac: String, name: String, active: Bool) {
    self.mac = mac
    self.name = name
    self.active = active
  }

}
