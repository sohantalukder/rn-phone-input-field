package com.rnphoneinput

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnPhoneInputViewManagerInterface
import com.facebook.react.viewmanagers.RnPhoneInputViewManagerDelegate

@ReactModule(name = RnPhoneInputViewManager.NAME)
class RnPhoneInputViewManager : SimpleViewManager<RnPhoneInputView>(),
  RnPhoneInputViewManagerInterface<RnPhoneInputView> {
  private val mDelegate: ViewManagerDelegate<RnPhoneInputView>

  init {
    mDelegate = RnPhoneInputViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<RnPhoneInputView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RnPhoneInputView {
    return RnPhoneInputView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RnPhoneInputView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RnPhoneInputView"
  }
}
