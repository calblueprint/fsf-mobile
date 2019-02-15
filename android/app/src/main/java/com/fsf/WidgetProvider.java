package com.fsf;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.net.Uri;

import com.facebook.react.HeadlessJsTaskService;

public class WidgetProvider extends AppWidgetProvider {
    private static final String WIDGET_TASK = "com.fsf.WIDGET_TASK";

    /*
    * When enabled on screen, let the NavigationBridge
    * manipulate it from javascript
    */

    @Override
    public void onEnabled(Context context) {
        Log.d("WIDGET_PROVIDER", "En onEnabled");
        Intent serviceIntent = new Intent(context, BackgroundTask.class);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }

    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!incomingIntent.getAction().startsWith("com.fsf.CHARM")) {
            return;
        }

        if (incomingIntent.getAction().equals("com.fsf.CHARM_1")) {
            /*RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.charm_button1);

            remoteViews.setOnClickPendingIntent(R.id.charm_button1, getPendingSelfIntent(context, "com.fsf.CHARM_1"));

            ComponentName widgetName = new ComponentName(context, WidgetProvider.class);

            Random rnd = new Random();
            remoteViews.setTextViewText(R.id.charm_name, String.valueOf(rnd.nextInt()));

            AppWidgetManager.getInstance(context).updateAppWidget(widgetName, remoteViews);*/
        }

        Intent silentStartIntent = new Intent(context, BackgroundTask.class);
        context.startService(silentStartIntent);

        /*
        * Proxy bundle extras towards the service
        * */
        Intent serviceIntent = new Intent(context, BackgroundTask.class);
        serviceIntent.putExtras(incomingIntent);
        context.startService(serviceIntent);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.charm_button1);

        Intent configIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("fsf://fsf/donate/"));

        PendingIntent configPendingIntent = PendingIntent.getActivity(context, 0, configIntent, 0);

        remoteViews.setOnClickPendingIntent(R.id.charm_button1, configPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetIds, remoteViews);
    }

    protected PendingIntent getPendingSelfIntent(Context context, String action) {
        Intent intent = new Intent(context, getClass());
        intent.setAction(action);
        return PendingIntent.getBroadcast(context, 0, intent, 0);
    }

}
