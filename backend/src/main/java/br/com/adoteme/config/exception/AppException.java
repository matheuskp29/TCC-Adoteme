package br.com.adoteme.config.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AppException extends BaseException {

	private static final long serialVersionUID = -4349161679424677660L;
	private final AppErrors errorType;

    @Getter
    private final Object[] params;

    private AppException(AppErrors errorType, Throwable ex, Object[] params) {
        super(ex, errorType.getMessageRes());
        this.errorType = errorType;
        this.params = params;
    }

    @Override
    public AppErrors error() {
        return errorType;
    }

    public static AppException of(AppErrors errorType) {
        return new AppException(errorType, null, null);
    }

    public static AppException of(AppErrors errorType, Object[] params) {
        return new AppException(errorType, null, params);
    }

    public static AppException of(AppErrors errorType, Throwable ex) {
        return new AppException(errorType, ex, null);
    }

    public static AppException of(AppErrors errorType, Throwable ex, Object[] params) {
        return new AppException(errorType, ex, params);
    }
}
