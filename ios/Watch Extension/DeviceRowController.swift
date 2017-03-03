//
//  DeviceRow.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  . All rights reserved.
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
      active.setColor(activeColor(device: device))
    }
  }
  
  private func activeColor(device: Device) -> UIColor {
    if device.loading { return .gray }
    return device.active ? .green : .red
  }
}
