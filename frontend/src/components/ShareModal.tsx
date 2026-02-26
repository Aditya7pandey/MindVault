import { useEffect, useState } from 'react';
import { Share2, Copy, Check, Globe, Lock } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { Button } from './ui/button';
import { useStore } from '../store/useStore';

export function ShareModal() {
    const { isVaultPublic, shareLink, toggleShare, isShareModalOpen, setShareModalOpen } = useStore();
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleToggle = async () => {
        setIsLoading(true);
        await toggleShare(!isVaultPublic);
        setIsLoading(false);
    };

    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Dialog open={isShareModalOpen} onOpenChange={setShareModalOpen}>
  <DialogContent className="w-full max-w-md bg-[#0F0F0F] border-white/10 text-white overflow-hidden">
    
    <DialogHeader>
      <DialogTitle className="text-xl font-bold flex items-center gap-2">
        <Share2 className="w-5 h-5 text-indigo-400" />
        Share your Mind Vault
      </DialogTitle>
      <DialogDescription className="text-gray-400">
        Make your vault public to share your curated knowledge with others.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-6 py-4 w-full">
      
      {/* Access Toggle */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2 rounded-lg ${
              isVaultPublic
                ? "bg-green-500/10 text-green-400"
                : "bg-gray-500/10 text-gray-400"
            }`}
          >
            {isVaultPublic ? (
              <Globe className="w-5 h-5" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {isVaultPublic ? "Public Access" : "Private Vault"}
            </p>
            <p className="text-xs text-gray-500">
              {isVaultPublic
                ? "Anyone with the link can view"
                : "Only you can access"}
            </p>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          disabled={isLoading}
          variant={isVaultPublic ? "destructive" : "default"}
          size="sm"
          className="rounded-full px-6 shrink-0"
        >
          {isLoading ? "..." : isVaultPublic ? "Disable" : "Enable"}
        </Button>
      </div>

      {/* Share Link Section */}
      {isVaultPublic && shareLink && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 w-full">
          
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
            Shareable Link
          </label>

          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-3 w-full overflow-hidden">
            
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm text-gray-400 break-all">
                {shareLink}
              </p>
            </div>

            <Button
              onClick={handleCopy}
              size="sm"
              className="bg-indigo-500 hover:bg-indigo-600 gap-2 shrink-0 rounded-lg"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>

          </div>
        </div>
      )}
    </div>

    <div className="pt-2 text-[10px] text-gray-600 uppercase tracking-widest text-center font-medium">
      Secure end-to-end knowledge sharing
    </div>

  </DialogContent>
</Dialog>

    );
}
