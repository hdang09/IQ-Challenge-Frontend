'use client';
import Context from '@/context/AnswerContext';
import MobileLayout from '@/components/MobileLayout';

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Context>
            <MobileLayout>{children}</MobileLayout>
        </Context>
    );
}
