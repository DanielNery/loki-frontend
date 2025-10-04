import React, { ReactNode } from "react";

interface CardProps {
    title: string;
    value: any;
    IconComponent?: ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    className?: string;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export default function Card({ 
    title, 
    value, 
    IconComponent, 
    trend, 
    trendValue, 
    className = '',
    variant = 'default'
}: CardProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return 'border-l-4 border-l-success-500 bg-success-50/50 dark:bg-success-900/20';
            case 'warning':
                return 'border-l-4 border-l-warning-500 bg-warning-50/50 dark:bg-warning-900/20';
            case 'danger':
                return 'border-l-4 border-l-accent-500 bg-accent-50/50 dark:bg-accent-900/20';
            case 'info':
                return 'border-l-4 border-l-primary-500 bg-primary-50/50 dark:bg-primary-900/20';
            default:
                return 'border-l-4 border-l-slate-300 dark:border-l-slate-600';
        }
    };

    const getTrendIcon = () => {
        if (trend === 'up') return '↗';
        if (trend === 'down') return '↘';
        return '→';
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'text-success-600 dark:text-success-400';
        if (trend === 'down') return 'text-accent-600 dark:text-accent-400';
        return 'text-slate-500 dark:text-slate-400';
    };

    return (
        <div
            className={`
                relative overflow-hidden glass-strong rounded-2xl p-6 
                card-hover-effect group transition-all duration-300
                ${getVariantStyles()}
                ${className}
            `}
        >
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Header do card */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {title}
                </h3>
                {IconComponent && (
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors duration-300">
                        {IconComponent}
                    </div>
                )}
            </div>

            {/* Valor principal */}
            <div className="mb-3">
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {value}
                </div>
            </div>

            {/* Trend indicator */}
            {(trend || trendValue) && (
                <div className="flex items-center space-x-2">
                    {trend && (
                        <span className={`text-sm font-medium ${getTrendColor()}`}>
                            {getTrendIcon()}
                        </span>
                    )}
                    {trendValue && (
                        <span className={`text-sm font-medium ${getTrendColor()}`}>
                            {trendValue}
                        </span>
                    )}
                </div>
            )}

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        </div>
    );
}