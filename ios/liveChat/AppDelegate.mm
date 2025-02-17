#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <FirebaseCore/FirebaseCore.h>
#import <FirebaseMessaging/FirebaseMessaging.h>
#import <UserNotifications/UserNotifications.h> // Importa para manejar notificaciones

@interface AppDelegate () <RCTBridgeDelegate, UNUserNotificationCenterDelegate> // Asegúrate de declarar los protocolos correctamente
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"liveChat";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

    // Configurar Firebase
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  // Configurar permisos de notificaciones
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      dispatch_async(dispatch_get_main_queue(), ^{
        [application registerForRemoteNotifications];
      });
    } else {
      NSLog(@"Permisos de notificaciones no otorgados: %@", error);
    }
  }];

  // Configurar el estilo de la barra de estado solo si es anterior a iOS 13
  if (@available(iOS 13.0, *)) {
    // iOS 13 maneja el estilo de la barra de estado mediante la windowScene
  } else {
    [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
  }

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Manejar registro exitoso de APNs
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"APNs Token recibido: %@", deviceToken);

  // Pasar el token de APNs a Firebase Messaging
  [FIRMessaging messaging].APNSToken = deviceToken;
}

// Manejar error al registrar APNs
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"Error al registrar para notificaciones remotas: %@", error);
}

@end
