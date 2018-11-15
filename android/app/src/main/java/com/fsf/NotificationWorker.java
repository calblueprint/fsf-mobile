package com.fsf;

import android.content.Context;
import android.support.annotation.NonNull;

import androidx.work.ListenableWorker;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class NotificationWorker extends Worker {

    Context context;

    public NotificationWorker(@NonNull Context ctx, @NonNull WorkerParameters params) {
        super(ctx, params);
        this.context = ctx;
    }

    @NonNull
    @Override
    public Result doWork() {
        return Result.SUCCESS;
    }
}
