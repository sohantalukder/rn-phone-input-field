#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface RnPhoneInputViewManager : RCTViewManager
@end

@implementation RnPhoneInputViewManager

RCT_EXPORT_MODULE(RnPhoneInputView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
