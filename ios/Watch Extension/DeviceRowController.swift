//
//  DeviceRow.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import WatchKit

class DeviceRowController: NSObject {

  @IBOutlet var name: WKInterfaceLabel!
  @IBOutlet var mac: WKInterfaceLabel!
  @IBOutlet var active: WKInterfaceSeparator!
  
  var device: Device? {
    didSet {
      guard let device = device else { return }
      name.setText(device.name)
      mac.setText(device.mac)
      active.setColor(activeColor(active: device.active))
    }
  }
  
  internal func toggle(active: Bool) {
    self.active.setColor(activeColor(active: active))
  }
  
  private func activeColor(active: Bool) -> UIColor {
    return active ? .green : .red
  }
}
