//
//  DevicesInterfaceController.swift
//  WifiUC
//
//  Created by Nicolás Gebauer on 18-02-17.
//  . All rights reserved.
//

import WatchKit
import WatchConnectivity
import Foundation

class DevicesInterfaceController: WKInterfaceController {
  
  fileprivate enum Status: String {
    case connecting = "Conectando"
    case connected = "Conectado"
    case noSession = "Inicia sesión en tu iPhone"
    case noDevices = "Agrega dispositivos en tu iPhone"
    
    var showMessage: Bool {
      switch self {
      case .connecting, .noSession, .noDevices:
        return true
      case .connected:
        return false
      }
    }
  }
  
  fileprivate enum Message: String {
    case toggleDevice = "TOGGLE_DEVICE"
    case reloadDevices = "RELOAD_DEVICES"
  }
  
  @IBOutlet var message: WKInterfaceLabel!
  @IBOutlet var devicesTable: WKInterfaceTable!
  
  fileprivate var session: WCSession?
  fileprivate var devicesList = [Device]() {
    didSet {
      if devicesList.count == 0 && status != .noDevices { status = .noDevices }
      devicesTable.setNumberOfRows(devicesList.count, withRowType: "DeviceRow")
      
      for index in 0..<devicesTable.numberOfRows {
        guard let controller = devicesTable.rowController(at: index) as? DeviceRowController else { continue }
        controller.device = devicesList[index]
        if devicesState?.loading ?? false { controller.active.setColor(.gray) }
      }
    }
  }
  fileprivate var user: User? = nil {
    didSet {
      guard let user = user else { return }
      if user.loading && status != .connecting { status = .connecting }
      else if user.error != "" && status != .noSession { status = .noSession }
      else if !user.loading && user.rehydrated && user.error == "" && status != .connected { status = .connected }
    }
  }
  fileprivate var devicesState: DevicesState? = nil
  fileprivate var status: Status = .connecting {
    didSet {
      DispatchQueue.main.async {
        let showMessage = self.status.showMessage
        self.message.setText(self.status.rawValue)
        self.message.setHidden(!showMessage)
        self.devicesTable.setHidden(showMessage)
      }
    }
  }
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    status = .connecting
    if WCSession.isSupported() {
      print("Activating watch session")
      session = WCSession.default()
      session?.delegate = self
      session?.activate()
      reloadDevices()
    }
  }
  
  func updateData(data: [String: Any]) {
    guard
      let userData = data["user"] as? [String: Any],
      let devicesListDataRaw = data["devicesList"] as? [Any],
      let devicesStateData = data["devicesState"] as? [String: Any]
      else { return print("Bad data") }
    var devicesList = [Device]()
    devicesListDataRaw.forEach { deviceDataRaw in
      guard
        let deviceData = deviceDataRaw as? [String: Any],
        let device = Device(data: deviceData)
        else { return }
      devicesList.append(device)
    }
    guard
      let user = User(data: userData),
      let devicesState = DevicesState(data: devicesStateData)
      else { return print("Couldn't parse user and deviceState data")}
    self.user = user
    self.devicesState = devicesState
    self.devicesList = devicesList
    
//    print("user: \(user.username)")
//    print("devicesState: \(devicesState.loading)")
//    print("devicesList: \(devicesList[0].name)")
  }
  
  override func table(_ table: WKInterfaceTable, didSelectRowAt rowIndex: Int) {
    let device = devicesList[rowIndex]
    print("Try to toggle device: \(device.mac) index: \(rowIndex)")
    session?.sendMessage(["type": Message.toggleDevice.rawValue, "mac": device.mac], replyHandler: nil, errorHandler: {_ in self.status = .noSession})
  }
  
  @IBAction func reloadDevices() {
    print("Try to reload")
    session?.sendMessage(["type": Message.reloadDevices.rawValue], replyHandler: nil, errorHandler: {_ in self.status = .noSession})
  }
}

extension DevicesInterfaceController: WCSessionDelegate {
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
//    print("activationDidCompleteWith activationState: \(activationState) error: \(error)")
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
//    print("watch received message", message)
    updateData(data: message)
  }
  
}
