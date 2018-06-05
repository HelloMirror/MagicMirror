package com.example.seunghee.hello;

import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class TabFragment3 extends Fragment{
    public TabFragment3(){    }

    ImageView pic1, pic2, pic3, pic4;
    boolean p1 = true;
    boolean p2 = true;
    boolean p3 = true;
    boolean p4 = true;
    LinearLayout lin1, lin2, lin3, lin4;
    TextView textView3;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tab_fragment_3, container, false);

        pic1 = (ImageView)view.findViewById(R.id.pic1);
        pic2 = (ImageView)view.findViewById(R.id.pic2);
        pic3 = (ImageView)view.findViewById(R.id.pic3);
        pic4 = (ImageView)view.findViewById(R.id.pic4);

        LinearLayout lin1 = (LinearLayout)view.findViewById(R.id.lin1);
        LinearLayout lin2 = (LinearLayout)view.findViewById(R.id.lin2);
        LinearLayout lin3 = (LinearLayout)view.findViewById(R.id.lin3);
        LinearLayout lin4 = (LinearLayout)view.findViewById(R.id.lin4);

        lin1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (p1 == true){
                    pic1.setImageResource(R.drawable.face_2);
                    Toast.makeText(getActivity(), ":->", Toast.LENGTH_SHORT).show();
                    p1 = false;
                }else {
                    pic1.setImageResource(R.drawable.face_1);
                    p1 = true;
                }
            }
        });
        lin2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (p2 == true){
                    pic2.setImageResource(R.drawable.face_4);
                    Toast.makeText(getActivity(), ":-▷", Toast.LENGTH_SHORT).show();
                    p2 = false;
                }else {
                    pic2.setImageResource(R.drawable.face_3);
                    p2 = true;
                }
            }
        });
        lin3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (p3 == true){
                    pic3.setImageResource(R.drawable.face_6);
                    Toast.makeText(getActivity(), ":-o", Toast.LENGTH_SHORT).show();
                    p3 = false;
                }else {
                    pic3.setImageResource(R.drawable.face_5);
                    p3 = true;
                }
            }
        });
        lin4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    pic4.setImageResource(R.drawable.face_8);
                    Toast.makeText(getActivity(), ":-)", Toast.LENGTH_SHORT).show();
                    if (p4 == true){
                    p4 = false;
                }else {
                    pic4.setImageResource(R.drawable.face_7);
                    p4 = true;
                }
            }
        });

        return view;
    }
}
