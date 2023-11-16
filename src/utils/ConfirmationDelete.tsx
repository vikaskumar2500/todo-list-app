import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
type onClickProps = {
  onClick: (isTrue: boolean) => Promise<void>;
};
const ConfirmationDelete = ({ onClick }: onClickProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async () => {
    setIsLoading(true);
    await onClick(true);
    setIsLoading(false);
  };
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full min-h-screen shadow-2xl border-black backdrop-blur-sm z-50">
      <Card className="absolute z-auto bg-violet-300/70  min-w-[400px] rounded-xl ">
        <CardHeader>Are you sure want to delete this todo?</CardHeader>
        <CardContent className="flex gap-2 w-full justify-end -mb-3">
          <Button
            onClick={() => onClick(false)}
            className="bg-transparent border border-slate-500/30 rounded-[8px] hover:bg-rose-500/70 h-[34px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            className="bg-emerald-400/80 rounded-[8px] hover:bg-emerald-600 h-[34px]"
          >
            {isLoading && <Loader2 className="w-4 h-4 text-white animate-spin" />}
            {!isLoading && <p>Delete</p>} 
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationDelete;
