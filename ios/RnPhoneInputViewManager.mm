#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface RnPhoneInputFieldViewManager : RCTViewManager
@end

@implementation RnPhoneInputFieldViewManager

RCT_EXPORT_MODULE(RnPhoneInputFieldView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
