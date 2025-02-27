package com.rn-phone-input-field

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnPhoneInputFieldViewManagerInterface
import com.facebook.react.viewmanagers.RnPhoneInputFieldViewManagerDelegate

@ReactModule(name = RnPhoneInputFieldViewManager.NAME)
class RnPhoneInputFieldViewManager : SimpleViewManager<RnPhoneInputFieldView>(),
  RnPhoneInputFieldViewManagerInterface<RnPhoneInputFieldView> {
  private val mDelegate: ViewManagerDelegate<RnPhoneInputFieldView>

  init {
    mDelegate = RnPhoneInputFieldViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<RnPhoneInputFieldView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RnPhoneInputFieldView {
    return RnPhoneInputFieldView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RnPhoneInputFieldView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RnPhoneInputFieldView"
  }
}
