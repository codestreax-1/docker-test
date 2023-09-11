#include<iostream>
#include<fstream>
#include<string>
#include<sstream>
#include<vector>
using namespace std;

class Solution{
    public:
    int maxElementInArray(int n, vector<int> &arr){
        if(n == 0) return 0;
        int max = arr[0];
        for(int i=1;i<n;i++){
            if(arr[i]>max){
                max = arr[i];
            }
        }
        return max;
    }
};

int main(){
    ifstream file("test-cases.txt");
    string line;

    getline(file,line);
    int ntc = stoi(line);

    int *sizes = new int[ntc];
    vector<vector<int>> arrays(ntc);
    int *ans = new int[ntc];

    for(int i=0;i<ntc;i++){
        getline(file, line);
        stringstream ss(line);
        
        string temp;
        getline(ss,temp,',');
        sizes[i] = stoi(temp);
        getline(ss,temp,',');

        stringstream ss2(temp);
        while(ss2>>temp){
            arrays[i].push_back(stoi(temp));
        }
        getline(ss,temp,',');
        ans[i] = stoi(temp);
    }

        Solution sol;

        bool check = true;
        int count = 0;
        for(int i=0;i<ntc;i++){
            cout<<i<<" ";
            if(sol.maxElementInArray(sizes[i],arrays[i])!=ans[i]){
                check = false;
                count++;
            }
        }
        if(check){
            cout<<"all test cases passed"<<endl;
        }
        else{
            cout<<"some test cases failed"<<endl;
        }

    return 0;
}