//
//  DevicesInterfaceController.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import WatchKit
import WatchConnectivity
import Foundation

class DevicesInterfaceController: WKInterfaceController {
  
  private enum Status: String {
    case connecting = "Conectando"
    case connected = "Conectado"
    case noSession = "Inicia sesión en tu iPhone"
    case noDevices = "Agrega dispositivos en tu iPhone"
    
    var hideDevices: Bool {
      switch self {
      case .connecting, .noSession, .noDevices:
        return false
      case .connected:
        return true
      }
    }
  }
  
  @IBOutlet var message: WKInterfaceLabel!
  @IBOutlet var devicesTable: WKInterfaceTable!
  
  private var session: WCSession?
  private var devices = [Device]()
  private var status: Status = .connecting {
    didSet {
      DispatchQueue.main.async {
        let hideDevices = self.status.hideDevices
        self.message.setText(self.status.rawValue)
        self.message.setHidden(!hideDevices)
        self.devicesTable.setHidden(hideDevices)
      }
    }
  }
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    if WCSession.isSupported() {
      print("Activating watch session")
      self.session = WCSession.default()
      self.session?.delegate = self
      self.session?.activate()
    }
  }
  
//  override func awake(withContext context: Any?) {
//    super.awake(withContext: context)
//    
//    guard let context = context as? [Device] else {
//      loginMessage.setHidden(false)
//      devicesTable.setHidden(true)
//      return
//    }
//    loginMessage.setHidden(true)
//    devicesTable.setHidden(false)
//    devices = context
//    devicesTable.setNumberOfRows(devices.count, withRowType: "DeviceRow")
//    
//    for index in 0..<devicesTable.numberOfRows {
//      guard let controller = devicesTable.rowController(at: index) as? DeviceRowController else { continue }
//      controller.device = devices[index]
//    }
//  }
  
//  receivedContext(
  
}

extension DevicesInterfaceController: WCSessionDelegate {
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    print("activationDidCompleteWith activationState: \(activationState) error: \(error)")
  }
  
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
    print("did receive application context", applicationContext)
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    print("watch received message", message);
    let text = message["text"] as! String
    let timestamp : Double = (message["timestamp"] as! NSNumber).doubleValue
//    self.label.setText(text)
    let currentTimestamp: Double = Date().timeIntervalSince1970 * 1000
    let elapsed : Double = currentTimestamp - timestamp
    replyHandler(["elapsed":Int(elapsed), "timestamp": round(currentTimestamp)])
  }
  
}
