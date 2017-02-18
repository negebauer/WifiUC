//
//  DevicesInterfaceController.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import WatchKit
import Foundation


class DevicesInterfaceController: WKInterfaceController {
  
  @IBOutlet var loginMessage: WKInterfaceLabel!
  @IBOutlet var devicesTable: WKInterfaceTable!
  
  var devices = [Device]()
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    
    guard let context = context as? [Device] else {
      loginMessage.setHidden(false)
      devicesTable.setHidden(true)
      return
    }
    loginMessage.setHidden(true)
    devicesTable.setHidden(false)
    devices = context
    devicesTable.setNumberOfRows(devices.count, withRowType: "DeviceRow")
    
    for index in 0..<devicesTable.numberOfRows {
      guard let controller = devicesTable.rowController(at: index) as? DeviceRowController else { continue }
      controller.device = devices[index]
    }
  }
  
}
